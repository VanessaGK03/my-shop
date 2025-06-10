import styles from "./Top-navbar-styles.module.css";

import logo from "../../assets/Site-logo.png";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function TopNavbar({setShowSideBar}) {
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
        <FontAwesomeIcon style={{fontSize:30}} icon={faCartShopping} />
      </div>
    </div>
  );
}

export default TopNavbar;
