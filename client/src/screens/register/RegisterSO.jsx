import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkUniqueSO,registerSO } from "../../redux/appSlice";
import styles from "./RegisterSO.scss";
import classNames from "classnames/bind";
import CustomButton from "../../shared/CustomButton";
import { useNavigate } from "react-router-dom";
import cogoToast from "cogo-toast";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import {
    lazyload,
    responsive,
    accessibility,
    placeholder
  } from "@cloudinary/react";
  import Axios from "axios";


const RegisterSO = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setChangeUsername] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [firstPersonName, setChangeFirstPersonName] = useState("");
  const [firstPersonEmail, setChangeFirstPersonEmail] = useState("");
  const [firstPersonPassword, setChangeFirstPersonPassword] = useState("");

  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  



  const [imageSelected, setImageSelected] = useState([]);
  const [url , setUrl] = useState([]);
  const [secureUrl , setSecureUrl] = useState("");
  let arr = [];

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dbpz6zmrx",
    },
  });
  
  let img = myCld.image(url);

  const uploadImage= ()=>{
    console.log("hit here")
    setUrl([]);

    const formData = new FormData();

    console.log("images", imageSelected);

    for(let i = 0; i<imageSelected.length; i++){
      formData.append("file", imageSelected[i]);
      formData.append("upload_preset", "qt7djoyu");
      Axios.post("https://api.cloudinary.com/v1_1/dbpz6zmrx/image/upload", formData).then((response)=>{
        console.log(response);
        if(response.status=200){

          setUrl(url => [...url, response.data.public_id]);
          setSecureUrl(response.data.secure_url);
          
            console.log("the arr here", url);
        }
    });

    console.log("url arr", secureUrl);
    }
  }
  
  useEffect(()=>{
    uploadImage();
      },[imageSelected])

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  var id = username+"-"+randomIntFromInterval(1, 10000000);




  const usernameHandler = (event) => {
    setChangeUsername(event.target.value);
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

    // const response = await axios.post(
    //   "https://couple-goals-new.herokuapp.com/api/sendemail",
    //   data
    // );
    
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
          value={username}
          onChange={usernameHandler}
        />
        {username.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}
        <div>
          <CustomButton
            className="resident-btn"
            testId="resident"
            content="Check if username is unique"
            clicked={async () => {
              setFormSubmitted(true);

              if (username.length !== 0) {
                dispatch(
                  checkUniqueSO({
                    username,
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
            type="number"
            name="name"
            placeholder="SG Postal Code"
            value={postalCode}
            onChange={postalCodeHandler}
          />
        </div>
        {postalCode.length === 0 && formSubmitted ? (
          <div className={cx("input-general-error")}>*required</div>
        ) : null}


      </div>

      <div className={cx("store-icon-title")}>
        Store Icon
        <div className={cx("upload-container")}>
      <input style={{marginBottom:"30px", display:"flex", justifyContent:"center",alignItems:"center"}}type="file" multiple={false} onChange={(event)=>{setImageSelected(event.target.files)}}/>
      {/* <button onClick={uploadImage}>Upload Image</button> */}
      {url.map((item, i)=><AdvancedImage style={{padding:"20px"}}key={i} cldImg={myCld?.image(url[i])} plugins={[lazyload(),responsive(), placeholder()]} />)}
      

     
    </div>
      </div>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Register"
        clicked={async () => {
          setFormSubmitted(true);

          if (
            username.length !== 0 &&
            firstPersonName.length !== 0 &&
            firstPersonEmail.length !== 0 &&
            firstPersonPassword.length !== 0 &&
            address.length!==0 &&
            postalCode.length!==0 &&
            secureUrl.length!==0
            
          ) {
            dispatch(
              registerSO({
                id,
                username,
                firstPersonName,
                firstPersonEmail,
                firstPersonPassword,
                address,
                postalCode,
                secureUrl
              })
            );
              sendEmail();
             
              setFormSubmitted(false);
            setChangeUsername("");
            setChangeFirstPersonName("");
            setChangeFirstPersonEmail("");
            setChangeFirstPersonPassword("");
            setAddress("");
            setPostalCode("");
            setSecureUrl("");
          }
        }}
      ></CustomButton>

      <CustomButton
        className="resident-btn"
        testId="resident"
        content="Back"
        clicked={() => {
          navigate("/registerOptions");
        }}
      ></CustomButton>
    </div>
  );
};

export default RegisterSO;
