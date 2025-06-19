import { useContext, useEffect, useRef } from "react";
import Button from "../../components/Button/Button";
import styles from "./Profile-page-styles.module.css";
import useForm from "../../hooks/useFormHook";
import { checkForErrors } from "../../utils/useFormUtils";
import useFetch from "../../hooks/useFetchHook";
import { getUserId, logOutUser } from "../../utils/userUtils";
import requester from "../../api/requester";
import { useNavigate } from "react-router";
import { authContext } from "../../context/Auth-context";

function ProfilePage({ showSideBar }) {
  const editFormRef = useRef(null);
  const profileInfoRef = useRef(null);
  const userId = getUserId() || undefined;
  const auth = useContext(authContext);
  const navigate = useNavigate();

  let [profileData] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/users/" + userId,
    null,
    false
  );

  let [profileOrders] = useFetch(
    "GET",
    import.meta.env.VITE_API_ADRESS + "/orders/my-orders",
    null,
    false
  ) 

  useEffect(() => {
    if (profileData.username) {
      setForm(profileData.username, "username");
      setForm(profileData.email, "email");
    }
    console.log(profileOrders);
    
  }, [profileData, profileOrders]);

  const [form, setForm, formSubmitFunction] = useForm(
    {
      email: { value: "", required: true, minL: 5, maxL: 50, email: true },
      password: { value: "", required: true, minL: 5, maxL: 20 },
      username: { value: "", required: true, minL: 3, maxL: 20 },
    },
    async (username, email, password) => {
      let data = await requester(
        "PUT",
        import.meta.env.VITE_API_ADRESS + "/users/" + userId,
        {
          username,
          email,
          password,
        }
      );
      if (data.message) {
        alert(data.message);
        return;
      } else {
        profileData.email = data.email;
        profileData.username = data.username;

        setForm(data.username, "username");
        setForm(data.email, "email");
        setForm("", "password");
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

  console.log(profileData);

  const showEditForm = () => {
    const editForm = editFormRef.current;
    const profileInfo = profileInfoRef.current;
    editForm.style.display = "block";
    profileInfo.style.display = "none";
  };

  function editProfile(e) {
    e.preventDefault();

    const editForm = editFormRef.current;
    const profileInfo = profileInfoRef.current;
    editForm.style.display = "none";
    profileInfo.style.display = "block";

    formSubmitFunction(
      form.username.value,
      form.email.value,
      form.password.value
    );
  }

  function closeEdit(e) {
    e.preventDefault();

    const editForm = editFormRef.current;
    const profileInfo = profileInfoRef.current;
    editForm.style.display = "none";
    profileInfo.style.display = "block";
  }

  let formError = checkForErrors(form);

  return (
    <div className={styles["main-container"]} style={expandMainClass}>
      <div className={styles["profile-section"]}>
        <h2>My Profile</h2>
        <div className={styles["profile-info"]} ref={profileInfoRef}>
          <p>
            <strong>Username:</strong>{" "}
            <span id="username">{profileData.username}</span>
          </p>
          <p>
            <strong>Email:</strong> <span id="email">{profileData.email}</span>
          </p>
          <Button page={"edit"} handleOnClick={showEditForm} />
        </div>

        <div
          className={styles["edit-form"]}
          style={{ display: "none" }}
          ref={editFormRef}
        >
          <form onSubmit={editProfile}>
            <label>
              Username:{" "}
              <input
                type="text"
                id="username"
                name="username"
                value={form.username.value}
                onChange={(e) => {
                  setForm(e.currentTarget.value, e.target.name);
                }}
              />
              <small id="usernameError" className={styles["error-message"]}>
                {form.username.error}
              </small>
            </label>
            <label>
              Email:{" "}
              <input
                type="email"
                id="email"
                name="email"
                value={form.email.value}
                onChange={(e) => {
                  setForm(e.currentTarget.value, e.target.name);
                }}
              />
              <small id="usernameError" className={styles["error-message"]}>
                {form.email.error}
              </small>
            </label>
            <label>
              Password:{" "}
              <input
                type="password"
                id="password"
                name="password"
                value={form.password.value}
                onChange={(e) => {
                  setForm(e.currentTarget.value, e.target.name);
                }}
              />
              <small id="usernameError" className={styles["error-message"]}>
                {form.password.error}
              </small>
            </label>
            <div style={{ display: "flex", gap: "20px" }}>
              <Button page={"save"} disabled={formError} />
              <Button page={"save-back"} handleOnClick={closeEdit} />
            </div>
          </form>
        </div>

        <div className={styles["profile-actions"]}>
          <Button
            page={"logout"}
            handleOnClick={() => {
              logOutUser();
              auth.setUser({ isLogged: false });
              navigate("/login");
            }}
          />
          <Button
            page={"delete"}
            handleOnClick={async () => {
              await requester("DELETE", import.meta.env.VITE_API_ADRESS + "/users/" + userId)
              logOutUser();
              auth.setUser({ isLogged: false });
              navigate("/login");
            }}
          />
        </div>
      </div>

      <div className={styles["orders-section"]}>
        <h2>My Orders</h2>
        <ul id="orderList">
          {Array.isArray(profileOrders) && profileOrders.map((order) => {
            return <li key={order._id}>Order #{order.number} - ${order.totalPrice} - {new Date(order.date).toLocaleDateString("bg-BG")}</li> 
          })}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePage;
