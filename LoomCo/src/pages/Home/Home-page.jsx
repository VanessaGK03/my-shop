import styles from "./Home-page-styles.module.css";
import backgroundImage from "../../assets/header.jpg";

function HomePage() {
  return (
    <>
      <div
        className={styles["hero-section"]}
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <h1>Welcome to Loom & Co</h1>
      </div>
    </>
  );
}

export default HomePage;
