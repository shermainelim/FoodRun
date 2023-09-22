import React, { useEffect, useState }  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import classNames from "classnames/bind";
import styles from "./AppNavigator.scss";
import Welcome from "../screens/welcome/Welcome";
import Register from "../screens/register/Register";
import LoginOptions from "../screens/login/loginOptions";
import FirstPersonLogin from "../screens/login/firstPersonLogin";
import SecondPersonLogin from "../screens/login/secondPersonLogin";
import FinanceForm from "../screens/finance/FinanceForm";
import FinanceFormSecond from "../screens/finance/FinanceFormSecond";
import ForgetPassword from "../screens/forgetPassword/forgetPassword";
import ForgetPasswordSec from "../screens/forgetPassword/forgetPasswordSecond";
import ChangePassword from "../screens/changePassword/ChangePassword";
import ChangePasswordSecond from "../screens/changePassword/ChangePasswordSecond";
import DashboardFirst from "../screens/Dashboard/DashboardFirst";
import DashboardTwo from "../screens/Dashboard/DashboardTwo";
import RegisterOptions from "../screens/register/RegisterOptions";
import RegisterSO from "../screens/register/RegisterSO";
import volOn from "../assets/vol-on.png";
import volOff from "../assets/vol-off.png";
import { toggleButtonSoundOff, toggleButtonSoundOn, useButtonSoundFlagData } from "../redux/appSlice";
import ImageUpload from "../screens/ImageUpload";
import ManyStores from "../screens/stores/ManyStores";

const AppNavigator = () => {

  const cx = classNames.bind(styles);

  const dispatch = useDispatch();
  
  const [aud, setAud] = useState(false);

  const music = document.getElementById('audio');

  useEffect(()=>{

if(!aud){
  music.pause();
  music.currentTime = 0 ;
  dispatch(toggleButtonSoundOff())
}
else{
  console.log("music")
  music.play();
  dispatch(toggleButtonSoundOn());
}
  },[aud])


  return (
    <div>      <img
    data-testid="img-logo-resident"
    className={cx("volOn")}
    src={aud?volOn:volOff}
    alt="Logo"
    onClick={()=>setAud(!aud)}
  />
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/loginOptions" element={<LoginOptions />} />
        <Route path="/firstPersonLogin" element={<FirstPersonLogin />} />
        <Route path="/secondPersonLogin" element={<SecondPersonLogin />} />
        <Route path="/dashboard" element={<DashboardFirst/>} />
        <Route path="/dashboardSecond" element={<DashboardTwo />} />
        <Route path="/financeForm" element={<FinanceForm />} />
        <Route path="/financeFormSecond" element={<FinanceFormSecond />} />
        <Route path="/forgetPassword" element={<ForgetPassword/>} />
        <Route path="/forgetPasswordSecond" element={<ForgetPasswordSec/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route path="/changePasswordSecond" element={<ChangePasswordSecond/>} />
        <Route path="/registerOptions" element={<RegisterOptions/>} />
        <Route path="/registerSO" element={<RegisterSO/>} />
        <Route path="/imageUpload" element={<ImageUpload/>} />
        <Route path="/stores" element={<ManyStores/>} />
      </Routes>
    </Router></div>
  );
};

export default AppNavigator;
