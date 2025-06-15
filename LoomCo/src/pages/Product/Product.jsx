import styles from "./Product-page-styles.module.css";
import Button from "../../components/Button/Button";
import { useParams } from "react-router";
import useFetch from "../../hooks/useFetchHook";
import { useEffect, useState } from "react";

function ProductPage({ showSideBar }) {
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

  const [catalogFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/products/" + id,
    null,
    false
  );

  useEffect(() => {
    setProduct(catalogFetchData);
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
        <p>Price: ${product?.price}</p>

        <label>
          Size:
          <select className={styles["select"]} id="sizeSelect">
            {product?.size?.map((size) => {
              return <option>{size}</option>;
            })}
          </select>
        </label>
        <label>Color:</label>
        <div className={styles["color-options"]}>
          {product?.color?.map((color) => {
            return (
              <div
                className={styles["color-circle"]}
                data-color={color}
                style={{ backgroundColor:color, border:"1px solid black" }}
              ></div>
            );
          })}
          
        </div>
        <div id="ratingStars"></div>

        <textarea
          className={styles["textarea"]}
          id="reviewText"
          placeholder="Leave a review..."
        ></textarea>
        <Button page={"product-comment"} />
        <Button page={"catalog"} />
        <h3>Reviews</h3>
        <ul id="reviewsList"></ul>
      </div>
    </div>
  );
}

export default ProductPage;
