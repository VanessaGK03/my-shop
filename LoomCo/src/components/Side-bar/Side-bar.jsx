import { Navigate, NavLink } from "react-router";
import styles from "./Side-bar-styles.module.css";
import { useContext } from "react";
import { authContext } from "../../context/Auth-context";
import { logOutUser } from "../../utils/userUtils";

function SideBar({ showSideBar }) {
  let showSideBarClass = {};

  const auth = useContext(authContext);

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
        {auth.currentUserLogged.isLogged && (
          <li>
            <NavLink to={"/profile"}>PROFILE</NavLink>
          </li>
        )}
        {((auth.currentUserLogged.isLogged && auth.currentUserLogged.isAdmin) || (auth.currentUserLogged.isLogged && auth.currentUserLogged.isModerator)) && 
        (<li>
            <NavLink to={"/panel"}>PANEL</NavLink>
          </li>)
        }
        {!auth.currentUserLogged.isLogged && (
          <li>
            <NavLink to={"/register"}>REGISTER</NavLink>
          </li>
        )}
        {!auth.currentUserLogged.isLogged && (
          <li>
            <NavLink to={"/login"}>LOG IN</NavLink>
          </li>
        )}
        {auth.currentUserLogged.isLogged && (
          <li>
            <NavLink onClick={() => {
              logOutUser();
              auth.setUser({ isLogged: false });
              Navigate("/login");
            }} to={"/login"}>LOG OUT</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default SideBar;
