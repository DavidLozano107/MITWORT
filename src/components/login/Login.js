import React, { useState } from "react";
import logo from "./img/wave1.png";
import backImage from "./img/bg.svg";
import LoginForm from "../loginForm/";
import SingUpForm from "../signUpForm/";
import ForgotPassword from "../forgotPassword/";

const Login = () => {
  const [register, setRegister] = useState(false);
  const [forgotPassword, setforgotPassword] = useState(false);

  const onRegisterActive = (e) => {
    setRegister(true);
  };

  const onForgotPasswortActive = (e) => {
    e.preventDefault();
    setforgotPassword(true);
  };

  return (
    <>
      <img className="wave" src={logo} alt="logo"></img>
      <div className="container">
        <div className="imagen">
          <img src={backImage} alt=""></img>
        </div>
        <div className="login-container">
          {/* ----------------------------------------------------- */}

          {register && <SingUpForm />}
          {forgotPassword && <ForgotPassword />}

          {register || forgotPassword ? null : (
            <LoginForm
              onRegisterActive={onRegisterActive}
              onForgotPasswortActive={onForgotPasswortActive}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
