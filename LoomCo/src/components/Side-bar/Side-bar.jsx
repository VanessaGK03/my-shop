import styles from "./Side-bar-styles.module.css";

function SideBar(){
   return (
    <div className={styles["sidebar"]}>
        <ul>
          <li>
            <a href="/" className={styles["title"]}>
              HOME
            </a>
          </li>
          <li>
            <a href="/woman" className={styles["title"]}>
              WOMAN
            </a>
          </li>
          <li>
            <a href="/man" className={styles["title"]}>
              MAN
            </a>
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
   )
}

export default SideBar