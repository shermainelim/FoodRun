import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFirstPerson,
  useIsLoggedInFirstPerson,
} from "../../redux/appSlice";
import styles from "./firstPersonLogin.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import home from "../../assets/home.png";
import cats from "../../assets/cats.gif";
import { Navigate } from "react-router-dom";

const FirstPersonLogin = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");

  const isLoggedInFirstPerson = useIsLoggedInFirstPerson();

  if (isLoggedInFirstPerson) {
    return <Navigate to="/dashboard" />;
  }

  const spaceNameHandler = (event) => {
    setChangeSpaceName(event.target.value);
  };

  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };

  const firstPersonPasswordHandler = (event) => {
    setChangeFirstPersonPassword(event.target.value);
  };

  return (
    <div className={cx("cus-container")}>
      <div className={cx("cus-img-container")}>
         <img
        data-testid="img-logo-resident"
        className={cx("cus-login-home")}
        src={home}
        alt="Logo"
      />

<img
        data-testid="img-logo-resident"
        className={cx("cus-login-cats")}
        src={cats}
        alt="Logo"
      />
      <div className="cus-title"> Login as Customer</div>
      </div>
     

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
        value={firstPersonEmail}
        onChange={firstPersonEmailHandler}
      />

      {firstPersonEmail.length === 0 && formSubmitted ? (
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
        value={firstPersonPassword}
        onChange={firstPersonPasswordHandler}
      />

      {firstPersonPassword.length === 0 && formSubmitted ? (
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
            spaceName.length !== 0 &&
            firstPersonEmail.length !== 0 &&
            firstPersonPassword.length !== 0
          ) {
            dispatch(
              loginFirstPerson({
                spaceName,
                firstPersonEmail,
                firstPersonPassword,
              })
            );
            setChangeSpaceName("");
            setChangeFirstPersonEmail("");
            setChangeFirstPersonPassword("");
          }
        }}
      ></CustomButton>

<CustomButton
        className="resident-btn"
        testId="resident"
        content="Forget Password"
        clicked={() => {
          navigate("/forgetPassword");
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

export default FirstPersonLogin;
