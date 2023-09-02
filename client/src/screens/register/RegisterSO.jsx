import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkUnique, register } from "../../redux/appSlice";
import styles from "./RegisterSO.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import cogoToast from "cogo-toast";

const RegisterSO = () => {
  const cx = classNames.bind(styles);

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [firstPersonName, setChangeFirstPersonName] = useState("");
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  
  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var id = randomIntFromInterval(1, 10000000);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spaceNameHandler = (event) => {
    setChangeSpaceName(event.target.value);
  };

  const firstPersonNameHandler = (event) => {
    setChangeFirstPersonName(event.target.value);
  };

  const firstPersonEmailHandler = (event) => {
    setChangeFirstPersonEmail(event.target.value);
  };

  const firstPersonPasswordHandler = (event) => {
    setChangeFirstPersonPassword(event.target.value);
  };



  const addressHandler = (event) => {
    setAddress(event.target.value);
  };

  const postalCodeHandler = (event) => {
    setPostalCode(event.target.value);
  };


  const sendEmail = async () => {
    //e.preventDefault();

    const data = {
      firstPersonEmail,
      firstPersonName
    };

    const response = await axios.post(
      "https://couple-goals-new.herokuapp.com/api/sendemail",
      data
    );
    
    cogoToast.success("Email First Sent!");
  };



  return (
    <div className={cx("register-only-container")}>
      <div className="register-title"> Create an account (Store Owners) </div>

      <div className={cx("input-container")}>
        <div className={cx("input-couple-space-name")}>
          Your username
        </div>
        <input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="Username"
          value={spaceName}
          onChange={spaceNameHandler}
        />
        {spaceName.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
        <div>
          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Check if username is unique"
            clicked={async () => {
              setFormSubmitted(true);

              if (spaceName.length !== 0) {
                dispatch(
                  checkUnique({
                    spaceName,
                  })
                );

                
              }
            }}
          ></CustomButton>
        </div>

        <div className={cx("input-couple-space-name-person")}>Store details</div>
        <div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="Store Name"
            value={firstPersonName}
            onChange={firstPersonNameHandler}
          />
        </div>
        {firstPersonName.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="Email"
            value={firstPersonEmail}
            onChange={firstPersonEmailHandler}
          />
        </div>
        {firstPersonEmail.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div>
          <input
            className={cx("input-general")}
            type="password"
            name="name"
            placeholder="Password"
            value={firstPersonPassword}
            onChange={firstPersonPasswordHandler}
          />
        </div>
        {firstPersonPassword.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
       

<div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="SG Address"
            value={address}
            onChange={addressHandler}
          />
        </div>
        {address.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

<div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="SG Postal Code"
            value={address}
            onChange={postalCodeHandler}
          />
        </div>
        {postalCode.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}


      </div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Register"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            spaceName.length !== 0 &&
            firstPersonName.length !== 0 &&
            firstPersonEmail.length !== 0 &&
            firstPersonPassword.length !== 0 
            
          ) {
            dispatch(
              register({
                id,
                spaceName,
                firstPersonName,
                firstPersonEmail,
                firstPersonPassword,
            
                
              })
            );
              sendEmail();
             
              setFormSubmitted(false);
            setChangeSpaceName("");
            setChangeFirstPersonName("");
            setChangeFirstPersonEmail("");
            setChangeFirstPersonPassword("");
           
           
          }
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

export default RegisterSO;