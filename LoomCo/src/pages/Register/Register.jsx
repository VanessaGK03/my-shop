import { useContext, useState } from "react";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import styles from "./Register-page-styles.module.css";
import requester from "../../api/requester";
import { authContext } from "../../context/Auth-context";
import { useNavigate } from "react-router";

function RegisterPage({ showSideBar }) {
  const auth = useContext(authContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [form, setForm, formSubmitFunction, resetForm] = useForm(
    {
      email: { value: "", required: true, minL: 5, maxL: 50, email: true },
      password: { value: "", required: true, minL: 5, maxL: 20 },
      username: { value: "", required: true, minL: 3, maxL: 20 },
      confirmPassword: {
        value: "",
        required: true,
        minL: 5,
        maxL: 20,
        match: true,
      },
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/users/register",
        {
          username: form.username.value,
          password: form.password.value,
          email: form.email.value,
        }
      );

      if (data.message) {
        setErrorMessage(data.message);
        resetForm();
      } else {

        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            id: data._id,
            token: data.token,
            isAdmin:data.isAdmin,
            isModerator:data.isModerator
          })
        );
        auth.setUser({
          username: data.username,
          id: data._id,
          token: data.token,
          isLogged: true,
          isAdmin:data.isAdmin,
          isModerator:data.isModerator
        });
        navigate("/home");
      }
    }
  );

  let expandMainClass = {};

  if (!showSideBar) {
    expandMainClass.marginLeft = "0px";
    expandMainClass.width = "100%";
  } else {
    expandMainClass.marginLeft = "200px";
    expandMainClass.width = "calc(100% - 200px)";
  }

  let formError = checkForErrors(form);

  console.log(formError);

  return (
    <div className={styles["form-container"]}>
      <h2>Registration Form</h2>
      <form onSubmit={formSubmitFunction}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => {
            setForm(e.currentTarget.value, e.target.name);
          }}
        />
        <small id="usernameError" className={styles["error-message"]}>
          {form.username.error}
        </small>

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => {
            setForm(e.currentTarget.value, e.target.name);
          }}
        />
        <small id="emailError" className={styles["error-message"]}>
          {form.email.error}
        </small>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => {
            setForm(e.currentTarget.value, e.target.name);
          }}
        />
        <small id="passwordError" className={styles["error-message"]}>
          {form.password.error}
        </small>

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          onChange={(e) => {
            setForm(e.currentTarget.value, e.target.name);
          }}
        />
        <small id="confirmError" className={styles["error-message"]}>
          {form.confirmPassword.error}
        </small>

        <Button page={"register"} disabled={formError} />
        <p id="formMessage" style={{marginTop:"10px"}} className={styles["error-message"]}>{errorMessage}</p>
      </form>
    </div>
  );
}

export default RegisterPage;
