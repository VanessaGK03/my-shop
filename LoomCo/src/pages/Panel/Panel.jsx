import { useEffect, useState } from "react";
import styles from "./Panel-page-styles.module.css";
import useFetch from "../../hooks/useFetchHook";
import requester from "../../api/requester";
import { getUserId, isModerator } from "../../utils/userUtils";
import useForm from "../../hooks/useFormHook";

function PanelPage() {
  const [showEditStore, setEditStore] = useState(false);
  const [storeData, setStoreData] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [catalogData, setCatalogData] = useState([]);
  const [currentCatalogEdit, setCurrentCatalogEdit] = useState({});
  const [showCatalogEdit, setShowCatalogEdit] = useState(false);
  const [deliveryData, setDeliveryData] = useState([]);
  const [showDeliveryEdit, setShowDeliveryEdit] = useState(false);
  const [currentDeliveryEdit, setCurrentDeliveryEdit] = useState({});

  const [editUsersData, setEditUsersData] = useState([]);

  console.log(isModerator());
  

  const [storeFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/store",
    null,
    false
  );
  const [usersFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users",
    null,
    false
  );

  const [catalogFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/products",
    null,
    false
  );

  const [deliveryFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/delivery",
    null,
    false
  );

  useEffect(() => {
    setStoreData(storeFetchData);
    setUsersData(usersFetchData);
    setCatalogData(catalogFetchData);
    setDeliveryData(deliveryFetchData);
  }, [storeFetchData, usersFetchData, catalogFetchData, deliveryFetchData]);

  const [form, setForm, formSubmitFunction] = useForm(
    {
      name: { value: "", required: true },
      price: { value: "", required: true },
      discount: { value: "", required: true },
      picture: {
        value: "",
        required: true,
      },
      category: { value: "", required: true },
      type: { value: "", required: true },
    },
    async (e) => {
      e.preventDefault();

      let formData = new FormData(e.currentTarget);
      let isDiscount = false;

      if (++form.discount.value) {
        isDiscount = true;
      }

      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/products",
        {
          name: form.name.value,
          price: +form.price.value,
          size: formData.getAll("sizes"),
          color: formData.getAll("colors"),
          image: form.picture.value,
          discount: isDiscount,
          discountValue: +form.discount.value,
          type: form.type.value,
          category: form.category.value,
        }
      );

      setCatalogData((prevData) => {
        return [...prevData, data];
      });
    }
  );

  const [editForm, setEditForm, editFormSubmitFunction, resetForm] = useForm(
    {
      name: { value: "", required: true },
      price: { value: "", required: true },
      discount: { value: "", required: true },
      picture: {
        value: "",
        required: true,
      },
      category: { value: "", required: true },
      type: { value: "", required: true },
    },
    async (e) => {
      e.preventDefault();

      let formData = new FormData(e.currentTarget);
      let isDiscount = false;

      if (+editForm.discount.value) {
        isDiscount = true;
      }

      let data = await requester(
        "PUT",
        import.meta.env.VITE_API_ADRESS + "/products/" + currentCatalogEdit._id,
        {
          name: editForm.name.value,
          price: +editForm.price.value,
          size: formData.getAll("editSizes"),
          color: formData.getAll("editColors"),
          image: editForm.picture.value,
          discount: isDiscount,
          discountValue: ++editForm.discount.value,
          type: editForm.type.value,
          category: editForm.category.value,
        }
      );

      setCatalogData((prevData) => {
        let newData = JSON.parse(JSON.stringify(prevData));

        let indexOfOld = 0;

        for (let index = 0; index < newData.length; index++) {
          if (currentCatalogEdit._id === newData[index]._id) {
            indexOfOld = index;
            break;
          }
        }

        newData.splice(indexOfOld, 1, data);

        return [...newData];
      });
      setShowCatalogEdit(false);
      resetForm();
    }
  );

  const [deliveryForm, setDileveryForm, dileveryFormSubmitFunction] = useForm(
    {
      name: { value: "" },
      deliveryPriceToOffice: { value: "" },
      deliveryPriceToAddress: { value: "" },
    },
    async (e) => {
      e.preventDefault();
      await requester("POST", import.meta.env.VITE_API_ADRESS + "/delivery", {
        name: deliveryForm.name.value,
        deliveryPriceToOffice: +deliveryForm.deliveryPriceToOffice.value,
        deliveryPriceToAddress: +deliveryForm.deliveryPriceToAddress.value,
      });
    }
  );

  const [editDeliveryForm, setEditDileveryForm, editDileveryFormSubmitFunction] = useForm(
    {
      name: { value: "" },
      deliveryPriceToOffice: { value: "" },
      deliveryPriceToAddress: { value: "" },
    },
    async (e) => {
      e.preventDefault();

      let data = await requester("PUT", import.meta.env.VITE_API_ADRESS + "/delivery/" + String(currentDeliveryEdit._id), {
        name: editDeliveryForm.name.value,
        deliveryPriceToOffice: +editDeliveryForm.deliveryPriceToOffice.value,
        deliveryPriceToAddress: +editDeliveryForm.deliveryPriceToAddress.value,
      });
      let newDeliveryData = JSON.parse(JSON.stringify(deliveryData));

      let index = 0;

      for (let i = 0; i < deliveryData.length; i++) {
        if(currentDeliveryEdit._id === data._id){
            index = i;
        }
      }
      newDeliveryData.splice(index, 1, data);

      setDeliveryData([...newDeliveryData])
      setShowDeliveryEdit(false)
    }
  );

  return (
    <div className={styles["main-container"]}>
      <h2>Admin panel</h2>
      {isModerator() === false && (<div className={styles["store-info-container"]}>
        <h2>Store Info</h2>
        {!showEditStore && (
          <div id="storeDisplay">
            <p>
              <strong>Name:</strong>{" "}
              <span id="storeName">{storeData.name}</span>
            </p>
            <p>
              <strong>Address:</strong>{" "}
              <span id="storeAddress">{storeData.address}</span>
            </p>
            <button
              className={styles["blue-button"]}
              onClick={() => {
                setEditStore((prev) => {
                  return !prev;
                });
              }}
            >
              Edit
            </button>
          </div>
        )}
        {showEditStore && (
          <div id="storeEditForm">
            <label>Store name:</label>
            <input
              type="text"
              id="editStoreName"
              value={storeData.name}
              onChange={(e) => {
                setStoreData({
                  address: storeData.address,
                  name: e.currentTarget.value,
                });
              }}
            />
            <label>Address:</label>
            <input
              type="text"
              id="editStoreAddress"
              value={storeData.address}
              onChange={(e) => {
                setStoreData({
                  address: e.currentTarget.value,
                  name: storeData.name,
                });
              }}
            />
            <button
              className={styles["blue-button"]}
              onClick={async () => {
                const data = await requester(
                  "PUT",
                  import.meta.env.VITE_API_ADRESS + "/store",
                  {
                    name: storeData.name,
                    address: storeData.address,
                  }
                );
                console.log(data);

                setStoreData(data);
                setEditStore((prev) => {
                  return !prev;
                });
              }}
            >
              Save
            </button>
            <button
              className={styles["blue-button"]}
              onClick={() => {
                setEditStore((prev) => {
                  return !prev;
                });
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>)}
      

      <div className={styles["admin-container"]}>
        <div id="userlist" className={styles["user-list"]}>
          <h3>Users</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Username</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody id="userTableBody">
              {Array.isArray(usersData) &&
                usersData.map((user, i) => {
                  if (user.isModerator === false && user._id !== getUserId()) {
                    if (editUsersData[i] === true) {
                      return (
                        <tr key={user._id}>
                          <td className={styles.td}>
                            <input
                              type="text"
                              value={user.username}
                              onChange={(e) => {
                                let newUsersData = JSON.parse(
                                  JSON.stringify(usersData)
                                );
                                newUsersData[i].username =
                                  e.currentTarget.value;
                                console.log(newUsersData);

                                setUsersData([...newUsersData]);
                              }}
                            />
                          </td>
                          <td className={styles.td}>
                            <input
                              type="text"
                              value={user.email}
                              onChange={(e) => {
                                let newUsersData = JSON.parse(
                                  JSON.stringify(usersData)
                                );
                                newUsersData[i].email = e.currentTarget.value;
                                setUsersData([...newUsersData]);
                              }}
                            />
                          </td>
                          <td className={styles.td}>
                            <button
                              onClick={async () => {
                                let newUsersData = JSON.parse(
                                  JSON.stringify(usersData)
                                );

                                await requester(
                                  "PUT",
                                  import.meta.env.VITE_API_ADRESS +
                                    "/users/admin/" +
                                    user._id,
                                  {
                                    email: newUsersData[i].email,
                                    username: newUsersData[i].username,
                                  }
                                );
                                setUsersData([...newUsersData]);
                                setEditUsersData((array) => {
                                  let oldArray = array;
                                  oldArray[i] = false;
                                  return [...oldArray];
                                });
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={() => {
                                setEditUsersData((array) => {
                                  let oldArray = array;
                                  oldArray[i] = false;
                                  return [...oldArray];
                                });
                              }}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={user._id}>
                          <td className={styles.td}>{user.username}</td>
                          <td className={styles.td}>{user.email}</td>
                          <td className={styles.td}>
                            <button
                              onClick={() => {
                                setEditUsersData((array) => {
                                  let oldArray = array;
                                  oldArray[i] = true;
                                  return [...oldArray];
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button>Delete</button>
                            <button
                              onClick={async () => {
                                await requester(
                                  "PUT",
                                  import.meta.env.VITE_API_ADRESS +
                                    "/users/" +
                                    user._id +
                                    "/promote"
                                );
                                let newUsersData = JSON.parse(
                                  JSON.stringify(usersData)
                                );
                                newUsersData[i].isModerator = true;
                                setUsersData([...newUsersData]);
                              }}
                            >
                              Promote
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles["admin-container"]}>
        <div id="moderatorlist" className={styles["moderator-list"]}>
          <h3>Moderators</h3>
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                <th className={styles.th}>Username</th>
                <th className={styles.th}>Email</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody id="moderatorTableBody">
              {Array.isArray(usersData) &&
                usersData.map((user, i) => {
                  if (user.isModerator === true && user._id !== getUserId()) {
                    return (
                      <tr key={user._id}>
                        <td className={styles.td}>{user.username}</td>
                        <td className={styles.td}>{user.email}</td>
                        <td className={styles.td}>
                          <button
                            onClick={async () => {
                              await requester(
                                "PUT",
                                import.meta.env.VITE_API_ADRESS +
                                  "/users/" +
                                  user._id +
                                  "/demote"
                              );
                              let newUsersData = JSON.parse(
                                JSON.stringify(usersData)
                              );
                              newUsersData[i].isModerator = false;
                              setUsersData([...newUsersData]);
                            }}
                          >
                            Demote
                          </button>
                        </td>
                      </tr>
                    );
                  } else {
                    return null;
                  }
                })}
            </tbody>
          </table>
        </div>
      </div>

      <div className={styles["product-admin-container"]}>
        <h2>Add a product</h2>
        <form id="productForm" onSubmit={formSubmitFunction}>
          <label>Product name:</label>
          <input
            type="text"
            id="productName"
            name="name"
            required
            value={form.name.value}
            onChange={(e) => {
              setForm(e.currentTarget.value, e.target.name);
            }}
          />

          <label>Price:</label>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <input
              type="number"
              id="productPrice"
              required
              placeholder="Price"
              value={form.price.value}
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
              name="price"
            />
            <input
              type="number"
              id="productDiscount"
              placeholder="Discount (%)"
              min="0"
              name="discount"
              max="100"
              style={{ width: "120px" }}
              value={form.name.discount}
              onChange={(e) => {
                setForm(e.currentTarget.value, e.target.name);
              }}
            />
          </div>

          <label>Picture url:</label>
          <input
            name="picture"
            type="text"
            id="productImage"
            accept="image/*"
            required
            value={form.name.picture}
            onChange={(e) => {
              setForm(e.currentTarget.value, e.target.name);
            }}
          />

          <label>Category:</label>
          <select
            name="category"
            id="productCategory"
            value={form.name.category}
            onChange={(e) => {
              setForm(e.currentTarget.value, e.target.name);
            }}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
          </select>

          <label>Sizes:</label>
          <div>
            <label>
              <input type="checkbox" name="sizes" value="S" /> S
            </label>
            <label>
              <input type="checkbox" name="sizes" value="M" /> M
            </label>
            <label>
              <input type="checkbox" name="sizes" value="L" /> L
            </label>
            <label>
              <input type="checkbox" name="sizes" value="XL" /> XL
            </label>
          </div>

          <label>Colors:</label>
          <div>
            <label>
              <input type="checkbox" name="colors" value="White" /> White
            </label>
            <label>
              <input type="checkbox" name="colors" value="Black" /> Black
            </label>
            <label>
              <input type="checkbox" name="colors" value="Red" /> Red
            </label>
            <label>
              <input type="checkbox" name="colors" value="Blue" /> Blue
            </label>
            <label>
              <input type="checkbox" name="colors" value="Green" /> Green
            </label>
            <label>
              <input type="checkbox" name="colors" value="Yellow" /> Yellow
            </label>
            <label>
              <input type="checkbox" name="colors" value="Gray" /> Gray
            </label>
          </div>

          <label>Type:</label>
          <select
            name="type"
            id="productType"
            value={form.name.type}
            onChange={(e) => {
              setForm(e.currentTarget.value, e.target.name);
            }}
          >
            <option value="Dress">Dress</option>
            <option value="T-shirt">T-Shirt</option>
            <option value="Trousers">Trousers</option>
            <option value="Polo">Polo</option>
          </select>

          <button className={styles["blue-button"]}>Add a product</button>
        </form>

        <h3>All products</h3>
        <div id="productList">
          {Array.isArray(catalogData) &&
            catalogData.map((product, i) => {
              console.log(product);

              return (
                <div key={product._id} className={styles["clothing-item"]}>
                  <img
                    src={product.image}
                    alt="Product image"
                    style={{ width: "150px" }}
                  />
                  <p className={styles["clothes-name"]}>
                    Title: {product.name}
                  </p>
                  <p className={styles["clothes-price"]}>
                    Price: ${product.price}
                  </p>
                  <p>Category: {product.category}</p>
                  <p>Sizes: {product.size.join(" ")}</p>
                  <p>Colors: {product.color.join(" ")}</p>
                  <p>Type: {product.type}</p>

                  <button
                    className={styles["blue-button"]}
                    onClick={() => {
                      setEditForm(product.name, "name");
                      setEditForm(product.price, "price");
                      setEditForm(product.discountValue, "discount");
                      setEditForm(product.image, "picture");
                      setEditForm(product.category, "category");
                      setEditForm(product.type, "type");

                      setCurrentCatalogEdit({
                        ...product,
                      });
                      setShowCatalogEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button className={styles["delete-button"]}>Delete</button>
                </div>
              );
            })}
        </div>

        {showCatalogEdit && (
          <div id="productEditForm">
            <h3>Edit the product</h3>
            <form id="editForm" onSubmit={editFormSubmitFunction}>
              <input
                type="text"
                id="editProductName"
                placeholder="Име на продукта"
                required
                name="name"
                value={editForm.name.value}
                onChange={(e) =>
                  setEditForm(e.currentTarget.value, e.target.name)
                }
              />
              <input
                type="number"
                id="editProductPrice"
                placeholder="Цена"
                required
                value={editForm.price.value}
                name="price"
                onChange={(e) =>
                  setEditForm(e.currentTarget.value, e.target.name)
                }
              />
              <label for="editProductDiscount">Отстъпка (%):</label>
              <input
                type="number"
                id="editProductDiscount"
                min="0"
                max="100"
                value={editForm?.discount?.value}
                name="discount"
                onChange={(e) =>
                  setEditForm(e.currentTarget.value, e.target.name)
                }
              />

              <p>
                Нова цена: <span id="editCalculatedDiscountedPrice">0.00</span>{" "}
                лв.
              </p>

              <select
                id="editProductCategory"
                value={editForm.category.value}
                name="category"
                onChange={(e) =>
                  setEditForm(e.currentTarget.value, e.target.name)
                }
              >
                <option
                  selected={editForm.category.value === "man" ? true : false}
                  value="man"
                >
                  Man
                </option>
                <option
                  selected={editForm.category.value === "woman" ? true : false}
                  value="woman"
                >
                  Woman
                </option>
              </select>
              <br />
              <label>Sizes:</label>
              <br />
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.size.includes("S") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editSizes"
                  value="S"
                />{" "}
                S
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.size.includes("M") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editSizes"
                  value="M"
                />{" "}
                M
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.size.includes("L") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editSizes"
                  value="L"
                />{" "}
                L
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.size.includes("XL") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editSizes"
                  value="XL"
                />{" "}
                XL
              </label>

              <br />
              <label>Colors:</label>
              <br />
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Red") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Red"
                />{" "}
                Red
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Black") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Black"
                />{" "}
                Black
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("White") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="White"
                />{" "}
                White
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Blue") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Blue"
                />{" "}
                Blue
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Green") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Green"
                />{" "}
                Green
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Yellow") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Yellow"
                />{" "}
                Yellow
              </label>
              <label>
                <input
                  defaultChecked={
                    currentCatalogEdit.color.includes("Gray") === true
                      ? true
                      : false
                  }
                  type="checkbox"
                  name="editColors"
                  value="Gray"
                />{" "}
                Gray
              </label>

              <br />
              <label>Type:</label>
              <select
                id="editProductType"
                value={editForm.type.value}
                name="type"
                onChange={(e) =>
                  setEditForm(e.currentTarget.value, e.target.name)
                }
              >
                <option
                  selected={editForm.type.value === "Dress" ? true : false}
                  value="Dress"
                >
                  Dress
                </option>
                <option
                  selected={editForm.type.value === "T-shirt" ? true : false}
                  value="T-shirt"
                >
                  T-Shirt
                </option>
                <option
                  selected={editForm.type.value === "Trousers" ? true : false}
                  value="Trousers"
                >
                  Trousers
                </option>
                <option
                  selected={editForm.type.value === "Polo" ? true : false}
                  value="Polo"
                >
                  Polo
                </option>
              </select>

              <br />

              <button type="submit" className={styles["blue-button"]}>
                Save
              </button>
              <button
                onClick={() => {
                  setShowCatalogEdit(false);
                }}
                type="button"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>

      <div className={styles["delivery-container"]}>
        <h3>Add delivery company</h3>
        <form id="deliveryForm" onSubmit={dileveryFormSubmitFunction}>
          <input
            type="text"
            id="deliveryName"
            placeholder="Delivery company name"
            required
            name="name"
            value={deliveryForm.name.value}
            onChange={(e) => {
              setDileveryForm(e.currentTarget.value, e.target.name);
            }}
          />
          <input
            type="number"
            id="priceOffice"
            placeholder="Delivery price to office"
            step="0.01"
            min="0"
            required
            name="deliveryPriceToOffice"
            value={deliveryForm.deliveryPriceToOffice.value}
            onChange={(e) => {
              setDileveryForm(e.currentTarget.value, e.target.name);
            }}
          />
          <input
            type="number"
            id="priceAddress"
            placeholder="Delivery price to address"
            step="0.01"
            min="0"
            required
            name="deliveryPriceToAddress"
            value={deliveryForm.deliveryPriceToAddress.value}
            onChange={(e) => {
              setDileveryForm(e.currentTarget.value, e.target.name);
            }}
          />
          <button type="submit" className={styles["blue-button"]}>
            Добави
          </button>
        </form>

        <h3>Delivery companies</h3>
        <div id="deliveryList">
          {Array.isArray(deliveryData) &&
            deliveryData.map((delivery, i) => {
              return (
                <div style={{ border: '1px solid rgb(204, 204, 204)', padding: '10px', margin: '10px 0px' }}>
                  <strong>{delivery.name}</strong>
                  <br />
                  <span id="officeDisplay-0">До офис: ${delivery.deliveryPriceToOffice}</span>
                  <br />
                  <span id="addressDisplay-0">До адрес: ${delivery.deliveryPriceToAddress}</span>
                  <br />
                  <div id="buttons-0">
                    <button class="blue-button" onClick={() => {
                        setShowDeliveryEdit(true);                        
                        setCurrentDeliveryEdit(delivery);
                        setEditDileveryForm(delivery.name,"name")
                        setEditDileveryForm(delivery.deliveryPriceToOffice,"deliveryPriceToOffice")
                        setEditDileveryForm(delivery.deliveryPriceToAddress,"deliveryPriceToAddress")

                    }}>
                      Edit
                    </button>
                    <button class="delete-button" onclick="deleteDelivery(0)">
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {showDeliveryEdit && (<form id="editFields-0" style={{display:"flex", flexDirectio:"collumn" }} onSubmit={editDileveryFormSubmitFunction}>
            <label >Име:{" "}</label>
            <input type="text" name="name" value={editDeliveryForm.name.value} onChange={(e) => {
                setEditDileveryForm(e.currentTarget.value, e.target.name)
            }}/>
            <label >До офис:{" "}</label>
            <input type="number" id="editOffice-0" name="deliveryPriceToOffice" value={editDeliveryForm.deliveryPriceToOffice.value} onChange={(e) => {
                setEditDileveryForm(e.currentTarget.value, e.target.name)
            }}/>
            <br />
            <label >До адрес:{" "}</label>
            <input type="number" id="editAddress-0" name="deliveryPriceToAddress" value={editDeliveryForm.deliveryPriceToAddress.value} onChange={(e) => {
                setEditDileveryForm(e.currentTarget.value, e.target.name)
            }}/>
            <br />
            <button>Edit</button>
            <button onClick={() => {
                setShowDeliveryEdit(false)
            }}>Cancel</button>
        </form>)}

    </div>

      <div className={styles["admin-container"]} style={{ overflowX: "auto" }}>
        <h3>Statistic about sales</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
          className={styles.table}
        >
          <thead className={styles.thead}>
            <tr>
              <th
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.th}
              >
                #
              </th>
              <th
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.th}
              >
                Продукт
              </th>
              <th
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.th}
              >
                Брой продажби
              </th>
              <th
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.th}
              >
                Категория
              </th>
              <th
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.th}
              >
                Обща печалба
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                1
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Тениска Summer
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                35
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Мъже
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                $350.00
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                2
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Рокля Elegance
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                20
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Жени
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                $500.00
              </td>
            </tr>
            <tr>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                3
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Панталон Classic
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                15
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                Мъже
              </td>
              <td
                style={{ padding: "10px", border: "1px solid #ccc" }}
                className={styles.td}
              >
                $450.00
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PanelPage;
