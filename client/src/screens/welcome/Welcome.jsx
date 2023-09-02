import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Welcome.scss";
import Eco from "../../assets/f1.png";
import butterfly from "../../assets/butterfly.gif";
import CustomButton from "../../shared/CustomButton";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import cloth2 from "../../assets/music/cloth2.mp3";
import volOn from "../../assets/vol-on.png";
import volOff from "../../assets/vol-off.png";


const Welcome = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  const [aud, setAud] = useState(false);

  let audio = new Audio(cloth2)

  const music = document.getElementById('audio');

  useEffect(()=>{

if(!aud){
  music.pause();
  music.currentTime = 0 ;
}
else{
  console.log("music")
  music.play();
}
  },[aud])


  const navigateLogin=()=>{
    audio.play();
    navigate("/loginOptions");
  }

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
              Food Dash is committed to protecting the security of personal data. <br /> <br />
              <br /> While no security measure can guarantee against compromise, loss or misuse,<br /> <br />
              we use a variety of security technologies to protect data from unauthorized <br /> <br />
              access, use, or disclosure. 
              <br /> <br /> <br /> Personal data that you provide via the Application will not be shared<br /> <br />
               outside of Food Dash and its affiliates without your consent.<br /> <br />
              
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
        className={cx("volOn")}
        src={aud?volOn:volOff}
        alt="Logo"
        onClick={()=>setAud(!aud)}
      />
      <img
        data-testid="img-logo-resident"
        className={cx("gifButterfly")}
        src={butterfly}
        alt="Logo"
      />
      <img
        data-testid="img-logo-resident"
        className={cx("imageIcon")}
        src={Eco}
        alt="Logo"
      />
      <div className={cx("title")}>Food Dash</div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Login"
        clicked={() => {
          navigateLogin();
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Register"
        clicked={() => {
          navigate("/registerOptions");
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
