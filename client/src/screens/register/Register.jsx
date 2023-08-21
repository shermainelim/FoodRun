import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkUnique, register } from "../../redux/appSlice";
import styles from "./Register.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import cogoToast from "cogo-toast";

const Register = () => {
  const cx = classNames.bind(styles);

  const [spaceName, setChangeSpaceName] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [firstPersonName, setChangeFirstPersonName] = useState("");
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");
  const [firstPersonBirthday, setChangeFirstPersonBirthday] = useState("");

  const [secondPersonName, setChangeSecondPersonName] = useState("");
  const [secondPersonEmail, setChangeSecondPersonEmail] = useState("");
  const [secondPersonPassword, setChangeSecondPersonPassword] = useState("");
  const [secondPersonBirthday, setChangeSecondPersonBirthday] = useState("");

  const [anniDate, setAnniDate] = useState("");
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

  const firstPersonBirthdayHandler = (event) => {
    setChangeFirstPersonBirthday(event.target.value);
  };

  const secondPersonNameHandler = (event) => {
    setChangeSecondPersonName(event.target.value);
  };

  const secondPersonEmailHandler = (event) => {
    setChangeSecondPersonEmail(event.target.value);
  };

  const secondPersonPasswordHandler = (event) => {
    setChangeSecondPersonPassword(event.target.value);
  };

  const secondPersonBirthdayHandler = (event) => {
    setChangeSecondPersonBirthday(event.target.value);
  };

  const anniDateHandler = (event) => {
    setAnniDate(event.target.value);
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

  const sendEmailSecondPerson = async () => {
   
    const data = {
      secondPersonEmail,
      secondPersonName
    };

    const response = await axios.post(
      "https://couple-goals-new.herokuapp.com/api/sendEmailSecond",
      data
    );
  
    cogoToast.success("Email Second Sent!");
  };

  return (
    <div className={cx("register-only-container")}>
      <div className="register-title"> Create a Couple Space</div>

      <div className={cx("input-container")}>
        <div className={cx("input-couple-space-name")}>
          Your Unique Couple Space's Name
        </div>
        <input
          className={cx("input-general")}
          type="text"
          name="name"
          placeholder="Couple Space Name"
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
            content="Check if space name is unique"
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

        <div className={cx("input-couple-space-name-person")}>1st Person</div>
        <div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="1st Person's Name"
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
            placeholder="1st Person's Email"
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
            placeholder="1st Person's Password"
            value={firstPersonPassword}
            onChange={firstPersonPasswordHandler}
          />
        </div>
        {firstPersonPassword.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
        <div className={cx("input-couple-anni")}>
          Enter first person's birthday{" "}
        </div>
        <div>
          <input
            className={cx("input-general")}
            type="date"
            name="name"
            placeholder="1st Person's Birthday"
            value={firstPersonBirthday}
            onChange={firstPersonBirthdayHandler}
          />
        </div>
        {firstPersonBirthday.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div className={cx("input-couple-space-name-person")}>2nd Person</div>
        <div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="2nd Person's Name"
            value={secondPersonName}
            onChange={secondPersonNameHandler}
          />
        </div>
        {secondPersonName.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div>
          <input
            className={cx("input-general")}
            type="text"
            name="name"
            placeholder="2nd Person's Email"
            value={secondPersonEmail}
            onChange={secondPersonEmailHandler}
          />
        </div>

        {secondPersonEmail.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div>
          <input
            className={cx("input-general")}
            type="password"
            name="name"
            placeholder="2nd Person's Password"
            value={secondPersonPassword}
            onChange={secondPersonPasswordHandler}
          />
        </div>
        {secondPersonPassword.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
        <div className={cx("input-couple-anni")}>
          Enter second person's birthday{" "}
        </div>
        <div>
          <input
            className={cx("input-general")}
            type="date"
            name="name"
            placeholder="2nd Person's Birthday"
            value={secondPersonBirthday}
            onChange={secondPersonBirthdayHandler}
          />
        </div>
        {secondPersonBirthday.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}

        <div className={cx("input-couple-anni")}>
          When did you get together?{" "}
        </div>
        <div>
          <input
            className={cx("input-general")}
            type="date"
            name="name"
            placeholder="Enter date"
            value={anniDate}
            onChange={anniDateHandler}
          />
        </div>
        {firstPersonName.length === 0 && formSubmitted ? (
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
            firstPersonPassword.length !== 0 &&
            firstPersonBirthday.length !== 0 &&
            secondPersonName.length !== 0 &&
            secondPersonEmail.length !== 0 &&
            secondPersonPassword.length !== 0 &&
            secondPersonBirthday.length !== 0 &&
            anniDate.length !== 0
          ) {
            dispatch(
              register({
                id,
                spaceName,
                firstPersonName,
                firstPersonEmail,
                firstPersonPassword,
                firstPersonBirthday,
                secondPersonName,
                secondPersonEmail,
                secondPersonPassword,
                secondPersonBirthday,
                anniDate,
              })
            );
              sendEmail();
              sendEmailSecondPerson();
              setFormSubmitted(false);
            setChangeSpaceName("");
            setChangeFirstPersonName("");
            setChangeFirstPersonEmail("");
            setChangeFirstPersonPassword("");
            setChangeSecondPersonName("");
            setChangeSecondPersonEmail("");
            setChangeSecondPersonPassword("");
           
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

export default Register;
