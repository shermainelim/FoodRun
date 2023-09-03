import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useIsLoggedInSecondPerson,
  loginSO,
} from "../../redux/appSlice";
import styles from "./secondPersonLogin.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import store from "../../assets/store.png";
import storeCat from "../../assets/storeCat.gif";

const SecondPersonLogin = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setChangeUsername] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [password, setChangePassword] = useState("");

  const isLoggedInSecondPerson = useIsLoggedInSecondPerson();

  if (isLoggedInSecondPerson) {
    return <Navigate to="/dashboardSecond" />;
  }

  const usernameHandler = (event) => {
    setChangeUsername(event.target.value);
  };

  const passwordHandler = (event) => {
    setChangePassword(event.target.value);
  };

  return (
    <div className={cx("so-register-container")}>
<div style={{position:"relative"}}><img
        data-testid="img-logo-resident"
        className={cx("so-login-home")}
        src={store}
        alt="Logo"
      />

<img
        data-testid="img-logo-resident"
        className={cx("so-login-cats")}
        src={storeCat}
        alt="Logo"
      /></div>

      <div className="so-register-title"> Login as Store Owner</div>

      

      <input
        style={{
          borderRadius: "0.625rem",
          padding: "0.5rem",
          width:"18.5rem",
          marginBottom: "1.25rem",
        }}
        type="text"
        name="name"
        placeholder="Username"
        value={username}
        onChange={usernameHandler}
      />

      {username.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "11.25rem",
            marginBottom: "0.3125rem",
            marginTop: "-0.9375rem",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <input
        style={{
          borderRadius: "0.625rem",
          padding: "0.5rem",
          width:"18.5rem",
          marginBottom: "1.25rem",
        }}
        type="password"
        name="name"
        placeholder="Password"
        value={password}
        onChange={passwordHandler}
      />

      {password.length === 0 && formSubmitted ? (
        <div
          style={{
            marginRight: "11.25rem",
            marginBottom: "0.3125rem",
            marginTop: "-0.9375rem",
            color: "darkred",
          }}
        >
          *required
        </div>
      ) : null}

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Login"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            username.length !== 0 &&
            password.length !== 0 
          ) {
            dispatch(
              loginSO({
                username,
                password
              })
            );
            setChangeUsername("");
            setChangePassword("");
          }
        }}
      ></CustomButton>

<CustomButton
        className="resident-btn"
        testId="resident"
        content="Forget Password"
        clicked={() => {
          navigate("/forgetPasswordSecond");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"
        clicked={() => {
          navigate("/loginOptions");
        }}
      ></CustomButton>
    </div>
  );
};

export default SecondPersonLogin;
