import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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

const AppNavigator = () => {
  return (
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
      </Routes>
    </Router>
  );
};

export default AppNavigator;
