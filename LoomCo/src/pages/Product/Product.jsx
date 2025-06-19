import styles from "./Product-page-styles.module.css";
import Button from "../../components/Button/Button";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetchHook";
import { Fragment, useEffect, useState } from "react";
import requester from "../../api/requester";
import { addProductToBasket, checkIfProductIsAdded } from "../../utils/userUtils";

function ProductPage({ showSideBar, setShowPop }) {
  let expandMainClass = {};

  if (!showSideBar) {
    expandMainClass.marginLeft = "0px";
    expandMainClass.width = "100%";
  } else {
    expandMainClass.marginLeft = "200px";
    expandMainClass.width = "calc(100% - 200px)";
  }

  const { id } = useParams();
  const [product, setProduct] = useState();
  const [productComment, setTextComment] = useState("");
  const [productColor, setColor] = useState(null);
  const [productSize, setProductSize] = useState(null);

  const [catalogFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/products/" + id,
    null,
    false
  );

  useEffect(() => {
    setProduct(catalogFetchData);
    if(catalogFetchData?.size?.length > 0){
          setProductSize(catalogFetchData?.size[0]);
    }
  }, [catalogFetchData]);

  return (
    <div className={styles["productDetails"]}>
      <div className={styles["wrapper"]}>
        <img
          src={product?.image}
          alt="Product image"
          className={styles["image"]}
        ></img>
        <h2>{product?.name}</h2>
        <p style={{display:"flex"}}>Price: $
            {product?.discount === false ? <a>{product?.price}</a> : <a style={{textDecoration:"line-through", color:"red"}}>{product?.price}</a>}

            {product?.discount === true && <a style={{marginLeft:"7px"}}>{product?.price - (product?.price * (product?.discountValue / 100))}</a>}
        </p>
        <label>
          Size:
          <select className={styles["select"]} id="sizeSelect" onChange={(e) => {
             setProductSize(e.currentTarget.value)
          }}>
            {product?.size?.map((size) => {
              return <option key={size}>{size}</option>;
            })}
          </select>
        </label>
        <label>Color:</label>
        <div className={styles["color-options"]}>
          {product?.color?.map((color) => {
            return (
              <Fragment key={color}>
                <input
                  type="radio"
                  id={color}
                  name="color"
                  style={{ display: "none" }}
                  className={styles.colorInputs}
                  value={color}
                  onChange={(e) => {
                    setColor(e.currentTarget.value)
                  }}
                />
                <label
                  className={styles["color-circle"]}
                  data-color={color}
                  style={{ backgroundColor: color, border: "1px solid black" }}
                  htmlFor={color}
                ></label>
              </Fragment>
            );
          })}
        </div>
        <div id="ratingStars"></div>

        <textarea
          className={styles["textarea"]}
          id="reviewText"
          placeholder="Leave a review..."
          value={productComment}
          onChange={(e) => {
            setTextComment(e.currentTarget.value);
          }}
          minLength={1}
        ></textarea>
        <Button
          page={"product-comment"}
          handleOnClick={async () => {
            let data = await requester(
              "POST",
              import.meta.env.VITE_API_ADRESS + "/products/" + id + "/reviews",
              { productComment }
            );
            setProduct(data);
          }}
        />
        <Button page={"catalog"} handleOnClick={async () => {
          if(productColor === null){
            alert("Choose a color please")
            return;
          }
          let productForBasket = product;
          productForBasket.productSize = productSize;
          productForBasket.productColor = productColor;

          let data = await requester("GET",import.meta.env.VITE_API_ADRESS + "/products/" + id,)

          setProduct(data);
          addProductToBasket(productForBasket);
          setShowPop(true);
        }} isProductFound={checkIfProductIsAdded(product || false)} />
        <h3>Reviews</h3>
        <ul
          id="reviewsList"
          style={{ display: "flex", gap: "13px", flexDirection: "column" }}
        >
          {product?.reviews?.length !== 0 &&
            product?.reviews?.map((review) => {
              return (
                <Fragment key={review._id}>
                  <li>
                    <p>{review.comment}</p>
                    <p>By: {review.username}</p>
                  </li>
                </Fragment>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default ProductPage;
