import React from "react";
import styles from "./RegisterOptions.scss";
import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../shared/CustomButton";
import eggs from "../../assets/eggs.png";

const RegisterOptions = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  return (
    <div className={cx("register-op-container")}>

<img
        data-testid="img-logo-resident"
        className={cx("register-op-eggs")}
        src={eggs}
        alt="Logo"
      />

      <div className="register-op-title"> Register Options</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Customers"
        clicked={() => {
          navigate("/register");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Store Owners"
        clicked={() => {
          navigate("/registerSO");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"
        clicked={() => {
          navigate("/");
        }}
      ></CustomButton>
    </div>
  );
};

export default RegisterOptions;
