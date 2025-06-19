import styles from "./Cart-page-styles.module.css";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import { clearBasket, getItemsFromBasket, isBasketEmpty, removeItemFromBasket } from "../../utils/userUtils";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetchHook";
import requester from "../../api/requester";
import { useNavigate } from "react-router";

function CartPage() {
  const [items, setItems] = useState(() => {
    return getItemsFromBasket();
  });

  const navigate = useNavigate()
  const [couriers, setCouriers] = useState(null);

  const [couriersFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/delivery",
    null,
    false
  );

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    setCouriers(couriersFetchData);
  }, [couriersFetchData]);

  let userData = JSON.parse(localStorage.getItem("user"))


  const [selectedCourier, setSelectedCourier] = useState(null);
  const [deliveryType, setDeliveryType] = useState("");

  function handleCourierChange(e) {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const courier = {
      name: e.target.value,
      deliveryPriceToOffice: parseFloat(
        selectedOption.getAttribute("data-priceoffice")
      ),
      deliveryPriceToAddress: parseFloat(
        selectedOption.getAttribute("data-priceaddress")
      ),
    };
    setSelectedCourier(courier);
  }

  function handleDeliveryTypeChange(e) {
    setDeliveryType(e.target.value);
  }

  console.log(items);
  

  const [form, setForm] = useForm({
    cardNumber: { maxL: 19, minL: 19, required: true, value: "" },
    dateMonth: { maxL: 2, minL: 1, required: true, value: "" },
    dateDay: { maxL: 2, minL: 1, required: true, value: "" },
    cvv: { maxL: 3, minL: 3, required: true, value: "" },
  });

  let formError = checkForErrors(form);  

  let cardNumberError = {};
  let dateMonthError = {};
  let dateDayError = {};
  let cvvError = {};

  if (form.cardNumber.error) {
    cardNumberError.borderBottom = "1px solid red";
  }
  if (form.dateMonth.error) {
    dateMonthError.borderBottom = "1px solid red";
  }
  if (form.dateDay.error) {
    dateDayError.borderBottom = "1px solid red";
  }
  if (form.cvv.error) {
    cvvError.borderBottom = "1px solid red";
  }

  let isVisa = undefined;
  if (form.cardNumber.value[0] === "2" || form.cardNumber.value[0] === "5") {
    isVisa = false;
  } else if (form.cardNumber.value[0] === "4") {
    isVisa = true;
  }

  return (
    <div className={styles["main-container"]}>
      <div id="cartContainer">
        {Array.isArray(items) &&
          items.map((item) => {
            return (
              <div className={styles["cart-item"]}>
                <img
                  src={item.image}
                  className={styles["cart-image"]}
                  alt="Product image"
                />
                <div className={styles["cart-details"]}>
                  <h3>{item.name}</h3>
                  <p style={{display:"flex"}}>Price: $
            {item?.discount === false ? <a>{item?.price}</a> : <a style={{textDecoration:"line-through", color:"red"}}>{item?.price}</a>}

            {item?.discount === true && <a style={{marginLeft:"7px"}}>{item?.price - (item?.price * (item?.discountValue / 100))}</a>}
        </p>
                  <p>Size: {item.productSize}</p>
                  <p>Color: {item.productColor}</p>
                  <p>
                    <strong>Total: ${item.price}</strong>
                  </p>
                  <button onClick={() => {
                    removeItemFromBasket(item.id)
                    setItems(getItemsFromBasket())
                    
                    let products = JSON.parse(localStorage.getItem("product"));

                    if(products.length === 0){
                      localStorage.removeItem("product")
                      navigate("/profile")
                    }
                    
                  }} className={styles["delete-button"]}>Remove</button>
                </div>
              </div>
            );
          })}
      </div>

      <hr />

      <form id="orderForm" className={styles.form} onSubmit={async (e) => {
        e.preventDefault();
        let totalPrice = 0;

        for (let index = 0; index < items.length; index++) {
           if(items[index].discount){
             let discounttedValue = items[index].discountValue / 100

             totalPrice += items[index].price - ( items[index].price  * discounttedValue)

             continue;
           }
           totalPrice += items[index].price
        }

        if(deliveryType === "office"){
          totalPrice += +selectedCourier.deliveryPriceToOffice
        }
        else if(deliveryType === "address"){
          totalPrice += +selectedCourier.deliveryPriceToAddress
        }

        await requester( "POST",
        import.meta.env.VITE_API_ADRESS + "/orders",{
          number: Math.floor(Math.random() * 100000) + 1,
          fullName:userData.username,
          phoneNumber:phone,
          products:items.map((item) => {
              return {
                productId:item._id,
                price:item.price
              }
          }),
          totalPrice:totalPrice,
          user:userData.id
        })

        navigate("/profile")
        clearBasket()
      }}>
        <h2>Add your data to order</h2>
        <label for="fullName">Full Name:</label>
        <input type="text" id="fullName" required value={fullName} onChange={(e) => {
           setFullName(e.currentTarget.value)          
        }} />
        <br />
        <br />

        <label for="phone">Phone Number:</label>
        <input type="tel" id="phone" required value={phone}  onChange={(e) => {
           setPhone(e.currentTarget.value)          
        }}/>
        <br />
        <br />

        <label for="courierSelect">Courier:</label>
        <select id="courierSelect" required onChange={handleCourierChange}>
          <option disabled selected value="">
            -- Choose Courier --
          </option>
          {Array.isArray(couriers) && couriers?.map((courier) => (
            <option
              key={courier._id}
              value={courier.name}
              data-priceoffice={courier.deliveryPriceToOffice}
              data-priceaddress={courier.deliveryPriceToAddress}
            >
              {courier.name}
            </option>
          ))}
        </select>
        <br />
        <br />

        <label>Delivery Type:</label>
        <br />
        <div className={styles["delivery-method"]}>
          <label>
            <input type="radio" name="deliveryOption" value="office" required  onChange={handleDeliveryTypeChange}/>
            Office
          </label>
          <label>
            <input type="radio" name="deliveryOption" value="address"  onChange={handleDeliveryTypeChange}/>
            Address
          </label>
        </div>

        <label for="address">Адрес за доставка:</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Въведете адрес"
          required
          value={address}
          onChange={(e) => {
           setAddress(e.currentTarget.value)          
        }}
        />

        <div id="deliveryPrice">
          Delivery Price:{" "}
          <strong>
            {selectedCourier && deliveryType
              ? deliveryType === "office"
                ? `${selectedCourier.deliveryPriceToOffice.toFixed(2)} лв`
                : `${selectedCourier.deliveryPriceToAddress.toFixed(2)} лв`
              : "--"}
          </strong>
        </div>
        <br />

        <button type="submit" className={styles["blue-button"]} disabled={formError}>
          Order
        </button>
      </form>

      <section className={styles["pay-wrapper"]} style={{ display: "block" }}>
        <form className={styles.payForm}>
          <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
            Add your credit cart information to pay
          </h3>
          <section className={styles["credit-card-wrapper"]}>
            <div className={styles["credit-card-images"]}>
              {isVisa === true ? (
              <img
                width="40"
                height="30"
                src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
              />
            ) : (
              <img
                width="40"
                height="30"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Mastercard_2019_logo.svg/800px-Mastercard_2019_logo.svg.png"
              />
            )}
            {isVisa === undefined ? (
              <img
                width="40"
                height="30"
                src="https://logos-world.net/wp-content/uploads/2020/05/Visa-Logo.png"
              />
            ) : (
              ""
            )}
            </div>
            <div className={styles["credit-card-main-info"]}>
              <p>Card number</p>
              <input
                type="tel"
                className={`${styles["input"]} ${styles["input-main-numbers"]}`}
                inputmode="numeric"
                autocomplete="cc-number"
                maxlength="19"
                placeholder="0000 0000 0000 0000"
                name="cardNumber"
                style={{ ...cardNumberError }}
                value={form.cardNumber.value}
                onChange={(e) => {
                  if (
                    !isNaN(Number(e.currentTarget.value)) &&
                    (e.currentTarget.value[0] === "2" ||
                      e.currentTarget.value[0] === "5" ||
                      e.currentTarget.value[0] === "4" ||
                      e.currentTarget.value === "")
                  ) {
                    if (
                      [4, 8, 12, 16].includes(
                        Number(form.cardNumber.value.length)
                      ) &&
                      e.currentTarget.value.slice(4) !== ""
                    ) {
                      setForm(
                        `${e.currentTarget.value.slice(
                          0,
                          4
                        )}-${e.currentTarget.value.slice(4)}`,
                        e.target.name
                      );
                      return;
                    }
                    setForm(e.currentTarget.value, e.target.name);
                  }
                  if (
                    e.currentTarget.value.includes("-") &&
                    e.currentTarget.value.match(/([a-zA-Z]+)/) === null
                  ) {
                    if (
                      e.currentTarget.value[
                        e.currentTarget.value.length - 1
                      ] === "-"
                    ) {
                      setForm(
                        e.currentTarget.value.slice(
                          0,
                          e.currentTarget.value.length - 1
                        ),
                        e.target.name
                      );
                      return;
                    }
                    if (
                      [5, 10, 15, 20].includes(
                        Number(e.currentTarget.value.length)
                      )
                    ) {
                      let input = e.currentTarget.value.slice(
                        0,
                        e.currentTarget.value.length - 1
                      );
                      input += "-";
                      input +=
                        e.currentTarget.value[e.currentTarget.value.length - 1];
                      setForm(input, e.target.name);
                      return;
                    }
                    setForm(e.currentTarget.value, e.target.name);
                  }
                }}
              />
            </div>
            <div className={styles["credit-card-additional-info"]}>
              <div>
                <p>Month and date</p>
                <input
                  value={form.dateMonth.value}
                  className={`${styles["input-additional"]} ${styles["input"]}`}
                  style={{
                    textAlign: "right",
                    ...dateMonthError,
                  }}
                  type="tel"
                  inputmode="numeric"
                  autocomplete="cc-number"
                  maxlength="2"
                  placeholder="00"
                  name="dateMonth"
                  onChange={(e) => {
                    if (!isNaN(Number(e.currentTarget.value))) {
                      if (
                        Number(e.currentTarget.value) <= 12 &&
                        Number(e.currentTarget.value) >= 1
                      ) {
                        setForm(e.currentTarget.value, e.target.name);
                      }
                    }
                    if (e.currentTarget.value === "") {
                      setForm(e.currentTarget.value, e.target.name);
                    }
                  }}
                />
                <span>/</span>
                <input
                  className={`${styles["input-additional"]} ${styles["input"]}`}
                  type="tel"
                  inputmode="numeric"
                  autocomplete="cc-number"
                  maxlength="2"
                  value={form.dateDay.value}
                  placeholder="00"
                  name="dateDay"
                  style={{
                    textAlign: "left",
                    paddingLeft: "5px",
                    paddingRight: "0px",
                    ...dateDayError,
                  }}
                  onChange={(e) => {
                    if (!isNaN(Number(e.currentTarget.value))) {
                      if (!isNaN(Number(e.currentTarget.value))) {
                        if (
                          Number(e.currentTarget.value) <= 31 &&
                          Number(e.currentTarget.value) >= 1
                        ) {
                          setForm(e.currentTarget.value, e.target.name);
                        }
                      }
                      if (e.currentTarget.value === "") {
                        setForm(e.currentTarget.value, e.target.name);
                      }
                    }
                  }}
                />
              </div>
              <div>
                <p>CVV code</p>
                <input
                  value={form.cvv.value}
                  type="password"
                  className={`${styles["input-cvvv"]} ${styles["input"]}`}
                  inputmode="numeric"
                  autocomplete="cc-number"
                  maxlength="3"
                  placeholder="000"
                  name="cvv"
                  style={cvvError}
                  onChange={(e) => {
                    if (!isNaN(Number(e.currentTarget.value))) {
                      setForm(e.currentTarget.value, e.target.name);
                    }
                  }}
                />
              </div>
            </div>
          </section>
        </form>
      </section>
    </div>
  );
}

export default CartPage;
