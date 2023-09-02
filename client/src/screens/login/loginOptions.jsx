import React from "react";
import styles from "./loginOptions.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import pancakes from "../../assets/pancakes.png";
import cloth2 from "../../assets/music/cloth2.mp3";

const LoginOptions = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();

  let audio = new Audio(cloth2);

  const navigateCustomerLogin=()=>{
    audio.play();
    navigate("/firstPersonLogin");
  }

  const navigateSOLogin=()=>{
    audio.play();
    navigate("/secondPersonLogin");
  }

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
          navigateCustomerLogin();
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Store Owners"
        clicked={() => {
          navigateSOLogin();
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
