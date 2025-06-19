import styles from "./Button-styles.module.css";

function Button({ page, handleOnClick, disabled, isProductFound }) {
  let buttonClass;
  let buttonText;

  switch (page) {
    case "catalog":
      buttonText = "Buy";
      buttonClass = styles["buy-button"];
      break;
    case "product":
      buttonText = "Buy";
      buttonClass = styles["buy-button"];
      break;
    case "product-comment":
      buttonText = "Submit Comment";
      buttonClass = styles["buy-button"];
      break;
    case "login":
      buttonText = "Log in";
      buttonClass = styles["login-button"];
      break;
    case "register":
      buttonText = "Register";
      buttonClass = styles["login-button"];
      break;
    case "edit":
      buttonText = "Edit";
      buttonClass = styles["edit-button"];
      break;
    case "delete":
      buttonText = "Delete Profile";
      buttonClass = styles["delete-button"];
      break;
    case "logout":
      buttonText = "Log out";
      buttonClass = styles["logout-button"];
      break;
    case "save":
      buttonText = "Save";
      buttonClass = styles["save-button"];
      break;
    case "save-back":
    buttonText = "Back";
    buttonClass = styles["save-button"];
    break;
  }

  if(isProductFound){
    buttonText = "Item is already in the basket";
    disabled = true;
  }

  return (
    <button disabled={disabled} onClick={handleOnClick} className={buttonClass}>
      {buttonText}
    </button>
  );
}

export default Button;
