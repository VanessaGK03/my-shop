import styles from "./Top-navbar-styles.module.css";

import logo from "../../assets/Site-logo.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import { getItemsFromBasket, isBasketEmpty } from "../../utils/userUtils";

function TopNavbar({setShowSideBar, showPop, setShowPop}) {
  let navigate = useNavigate();
  
  let makeBlock = "none"

  if(showPop === true){
     makeBlock = "block"
     setTimeout(() => {
        setShowPop(false);
     },3000)
  }

  console.log(showPop);
  

  return (
    <div className={styles["top-navbar"]}>
      <div onClick={() => {
        setShowSideBar((value) => {
            return !value;
        })
      }} className={styles["hamburger"]}>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className={styles["top-menu"]}>
        <div className={styles["logo"]}>
          <img src={logo} alt="logo" />
        </div>
        <div className={styles["rotating-text-container"]}>
          <div className={styles["rotating-text"]}>
            <span>Enjoy free worldwide shipping on all orders over $100</span>
            <span>Members get early access to upcoming collections</span>
            <span>New exclusive arrivals — luxury you can feel</span>
            <span>Enjoy free worldwide shipping on all orders over $100</span>
            <span>Members get early access to upcoming collections</span>
            <span>New exclusive arrivals — luxury you can feel</span>
          </div>
        </div>
        <FontAwesomeIcon style={{fontSize:30}} className={styles.hover} icon={faCartShopping} onClick={() => {
          if(isBasketEmpty() === false){
              return;
          }
          navigate("/cart")
        }} />
        <div style={{display: makeBlock}} className={styles["cart-popup"]} id="cartPopup">
        <span>Added to cart</span>
        </div>
      </div>
    </div>
  );
}

export default TopNavbar;
