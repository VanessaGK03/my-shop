import { Navigate, useNavigate } from "react-router";
import Button from "../../components/Button/Button";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import styles from "./Login-page-styles.module.css";
import requester from "../../api/requester";
import { useContext, useState } from "react";
import { authContext } from "../../context/Auth-context";

function LoginPage({ showSideBar }) {
    const auth = useContext(authContext);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [form, setForm, formSubmitFunction, resetForm] = useForm({
        email: { value: "", required: true, minL: 5, maxL: 50, email: true },
        password: { value: "", required: true, minL: 5, maxL: 20 }
    },
    async (e) => {
      e.preventDefault();
      let data = await requester(
        "POST",
        import.meta.env.VITE_API_ADRESS + "/users/login",
        {
          email: form.email.value,
          password: form.password.value,
        }
      )

      if (data.message) {
        setErrorMessage(data.message);   
        resetForm();     
      } else {
        localStorage.setItem(
          "user",
          JSON.stringify({
            username: data.username,
            id: data.id,
            token: data.token,
            isAdmin:data.isAdmin,
            isModerator:data.isModerator
          })
        );
        auth.setUser({
          username: data.username,
          id: data.id,
          token: data.token,
          isLogged:true,
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

    return (
        <div className={styles["form-container"]}>
            <h2>Log in</h2>
            <form onSubmit={formSubmitFunction}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email.value}
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
                    required
                    value={form.password.value}
                    onChange={(e) => {
                        setForm(e.currentTarget.value, e.target.name);
                    }}
                />
                <small id="passwordError" className={styles["error-message"]}>
                    {form.password.error}
                </small>

                <Button page={"login"} disabled={formError} />
                <p id="formMessage" style={{marginTop:"10px"}} className={styles["error-message"]}>{errorMessage}</p>
            </form>
        </div>
    );
}

export default LoginPage;