import { NavLink } from "react-router";
import styles from "./Side-bar-styles.module.css";

function SideBar({ showSideBar }) {
  let showSideBarClass = {};

  if (showSideBar) {
      showSideBarClass.left = "0px";
  } else {
      showSideBarClass.left = "-220px";
  }

  return (
    <div style={showSideBarClass} className={styles["sidebar"]}>
      <ul>
        <li>
          <NavLink to={"/home"}>HOME</NavLink>
        </li>
        <li>
          <NavLink to={"/woman"}>WOMAN</NavLink>
        </li>
        <li>
          <NavLink to={"/man"}>MAN</NavLink>
        </li>
        <li>
          <a href="#" className={styles["title"]}>
            ABOUT US
          </a>
        </li>
        <li>
          <a href="/profile" className={styles["title"]}>
            PROFILE
          </a>
        </li>
        <li>
          <a href="/registration" className={styles["title"]}>
            REGISTRATION
          </a>
        </li>
        <li>
          <a href="/login" className={styles["title"]}>
            LOG IN
          </a>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
