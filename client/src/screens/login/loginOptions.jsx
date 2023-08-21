import React from "react";
import styles from "./loginOptions.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";

const LoginOptions = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  return (
    <div className={cx("register-container")}>
      <div className="register-title"> Login Options</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="First Person"
        clicked={() => {
          navigate("/firstPersonLogin");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Second Person"
        clicked={() => {
          navigate("/secondPersonLogin");
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

export default LoginOptions;
