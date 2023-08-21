import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  useIsLoggedInSecondPerson,
  loginSecondPerson,
} from "../../redux/appSlice";
import styles from "./secondPersonLogin.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const SecondPersonLogin = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [secondPersonEmail, setChangeSecondPersonEmail] = useState("");
  const [secondPersonPassword, setChangeSecondPersonPassword] = useState("");

  const isLoggedInSecondPerson = useIsLoggedInSecondPerson();

  if (isLoggedInSecondPerson) {
    return <Navigate to="/dashboardSecond" />;
  }

  const spaceNameHandler = (event) => {
    setChangeSpaceName(event.target.value);
  };

  const secondPersonEmailHandler = (event) => {
    setChangeSecondPersonEmail(event.target.value);
  };

  const secondPersonPasswordHandler = (event) => {
    setChangeSecondPersonPassword(event.target.value);
  };

  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Login as 2nd Person</div>

      <input
        style={{
          borderRadius: "0.625rem",
          padding: "0.5rem",
          width:"18.5rem",
          marginBottom: "1.25rem",
        }}
        type="text"
        name="name"
        placeholder="Couple Space Name"
        value={spaceName}
        onChange={spaceNameHandler}
      />

      {spaceName.length === 0 && formSubmitted ? (
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
        type="text"
        name="name"
        placeholder="2nd Person's Email"
        value={secondPersonEmail}
        onChange={secondPersonEmailHandler}
      />

      {secondPersonEmail.length === 0 && formSubmitted ? (
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
        placeholder="2nd Person's Password"
        value={secondPersonPassword}
        onChange={secondPersonPasswordHandler}
      />

      {secondPersonPassword.length === 0 && formSubmitted ? (
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
            secondPersonEmail.length !== 0 &&
            secondPersonPassword.length !== 0
          ) {
            dispatch(
              loginSecondPerson({
                spaceName,
                secondPersonEmail,
                secondPersonPassword,
              })
            );
            setChangeSpaceName("");
            setChangeSecondPersonEmail("");
            setChangeSecondPersonPassword("");
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
