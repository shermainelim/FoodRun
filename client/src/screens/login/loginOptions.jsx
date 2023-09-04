import React from "react";
import styles from "./loginOptions.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import pancakes from "../../assets/pancakes.png";

const LoginOptions = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();


  return (
    <div className={cx("lo-op-container")}>
               <img
        data-testid="img-logo-resident"
        className={cx("lo-op-pancakes")}
        src={pancakes}
        alt="Logo"
      />
      <div className="lo-op-title"> Login Options</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Customers"
        clicked={() => {
          navigate("/firstPersonLogin");
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Store Owners"
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
