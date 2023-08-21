import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Welcome.scss";
import Couple from "../../assets/couple5.png";
import CustomButton from "../../shared/CustomButton";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const Welcome = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  const onSubmit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            style={{
            opacity:1,
              fontSize: "1.25rem",
              fontFamily: "monospace",
            }}
          >
            <h1>Terms and Condition</h1>
            <p>
              Couple Goals is committed to protecting the security of personal data. <br /> <br />
              <br /> While no security measure can guarantee against compromise, loss or misuse,<br /> <br />
              we use a variety of security technologies to protect data from unauthorized <br /> <br />
              access, use, or disclosure. 
              <br /> <br /> <br /> Personal data that you provide via the Application will not be shared<br /> <br />
               outside of Couple Goals and its affiliates without your consent.<br /> <br />
              
            </p>

            <CustomButton
              className="alert-btn"
              testId="resident"
              content="I agree"
              clicked={onClose}
            ></CustomButton>

            
          </div>
        );
      },
    });
  };




  return (
    <div className={cx("container")}>
      <img
        data-testid="img-logo-resident"
        className={cx("imageIcon")}
        src={Couple}
        alt="Logo"
      />
      <div className={cx("title")}>Couple Goals</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Create a Couple Space"
        clicked={() => {
          navigate("/register");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Login to Couple Space"
        clicked={() => {
          navigate("/loginOptions");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Terms and Conditions"
        clicked={onSubmit}
      ></CustomButton>

    </div>
  );
};

export default Welcome;
