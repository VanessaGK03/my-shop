import styles from "./Home-page-styles.module.css";
import backgroundImage from "../../assets/header.jpg";
import TopNavbar from "../../components/Top-navbar/Top-navbar";
import SideBar from "../../components/Side-bar/Side-bar";

function HomePage() {
  return (
    <>
      <TopNavbar/>
      <div
        className={styles["hero-section"]}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1>Welcome to Loom & Co</h1>
      </div>
      <SideBar/>
    </>
  );
}

export default HomePage;
