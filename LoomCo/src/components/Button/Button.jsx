import styles from "./Button-styles.module.css";

function Button({ page }) {
  let buttonClass;
  let buttonText;

  switch (page) {
    case "catalog":
      buttonText = "Buy";
      buttonClass = styles["buy-button"];
      break;
  }

  return <button className={buttonClass}>{buttonText}</button>;
}

export default Button;