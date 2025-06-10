import Button from "../../components/Button/Button";
import styles from "./Catalog-page-styles.module.css";

function CatalogPage({ showSideBar, category }) {
  console.log(category)
  
  let expandMainClass = {};

  if (!showSideBar) {
    expandMainClass.marginLeft = "0px";
    expandMainClass.width = "100%";
  } else {
    expandMainClass.marginLeft = "200px";
    expandMainClass.width = "calc(100% - 200px)";
  }

  return (
    <>
      <div className={styles["filter-bar"]}>
        <select className={styles["custom-select"]}>
          <option selected disabled>
            Category
          </option>
          <option>T-shirts</option>
          <option>Trousers</option>
        </select>

        <select className={styles["custom-select"]}>
          <option selected disabled>
            Size
          </option>
          <option>XS</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <div className={styles["range-slider"]}>
          <input type="range" id="range-min" min="0" max="500" value="100" />
          <input type="range" id="range-max" min="0" max="500" value="400" />
          <div className={styles["slider-track"]}></div>
          <div className={styles["price-labels"]}>
            <span id="range-min-label">$100</span>
            <span id="range-max-label">$400</span>
          </div>
        </div>
      </div>

      <div style={expandMainClass} className={styles["main-container"]}>
        <div id="productGrid" className={styles["product-grid"]}>
          <div className={styles["clothing-item"]}>
            <a>
              <img src="https://i5.walmartimages.com/seo/Vintage-1950s-Dresses-for-Women-Retro-Elegant-Mock-Neck-Short-Sleeve-Flared-Swing-A-Line-Cocktail-Party-Dress_2e5f1568-e94e-4215-8ec8-2cbfbdd15a4e.4432fc510019c2ec55027408edce627b.jpeg" />
            </a>
            <div class={styles["clothes-describe"]}>
              <p class={styles["clothes-name"]}></p>
              <p class={styles["clothes-price"]}></p>
              <Button page={"catalog"} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CatalogPage;
