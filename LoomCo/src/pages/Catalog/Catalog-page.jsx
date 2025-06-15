import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import styles from "./Catalog-page-styles.module.css";
import useFetch from "../../hooks/useFetchHook";
import { useEffect, useState } from "react";

function CatalogPage({ showSideBar, category }) {
  console.log(category);
  
  const [catalog, setCatalog] = useState([]);
  let navigate = useNavigate();

  const [catalogFetchData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/products",
    null,
    false
  );

  useEffect(() => {
    setCatalog(() => {
      if(Array.isArray(catalogFetchData)){
        let newCatalog = catalogFetchData.filter((product) => {
        if(product.category === category){
          return true;
        }
      })
      return newCatalog;
      }
      
    });
    console.log(catalogFetchData);
  },[catalogFetchData,category]);

  console.log(catalog);

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
      <div style={expandMainClass} className={styles["main-container"]}>
        {Array.isArray(catalog) &&
          catalog.map((product) => {
            return (
              <div key={product._id}
                id="productGrid"
                className={styles["product-grid"]}
                onClick={() => {
                  navigate("/product/" + product._id);
                }}
              >
                <div className={styles["clothing-item"]}>
                  <a>
                    <img src={product.image} />
                  </a>
                  <div class={styles["clothes-describe"]}>
                    <p class={styles["clothes-name"]}>{product.name}</p>
                    <p class={styles["clothes-price"]}>${product.price.toFixed(2)}</p>
                    <Button
                      handleOnClick={() => {
                        navigate("/product/" + "dasdasdsadertytgyrhgtdthgf");
                      }}
                      page={"catalog"}
                    />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default CatalogPage;
