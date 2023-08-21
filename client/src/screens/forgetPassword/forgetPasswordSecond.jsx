import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  loginFirstPerson, ForgetPasswordSecond,
  useIsLoggedInFirstPerson,
  forgetPasswordSecond,
} from "../../redux/appSlice";
import styles from "./ForgetPasswordSecond.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import * as cgUtils from "../../utils/cgUtil";
import { Navigate } from "react-router-dom";

const ForgetPasswordSec = () => {
  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formSubmitted, setFormSubmitted] = useState(false);
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
 

  const randNo = cgUtils.randomIntFromInterval(1,100000);


  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };


  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Input Second Person Email</div>
      <input
        style={{
          borderRadius: "0.625rem",
          padding: "0.625rem",
          paddingRight: "6.25rem",
          marginBottom: "1.25rem",
        }}
        type="text"
        name="name"
        placeholder="Email"
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

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Reset Password"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            
            firstPersonEmail.length !== 0 
          ) {
            
            dispatch(forgetPasswordSecond({ randNo, firstPersonEmail }));
            setChangeFirstPersonEmail("");
            
          }
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

export default ForgetPasswordSec;
