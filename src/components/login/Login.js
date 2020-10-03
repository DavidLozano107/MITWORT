import React, { Component } from "react";
import logo from "./img/wave1.png";
import backImage from "./img/bg.svg";
import LoginForm from "../loginForm/";
import SingUpForm from "../signUpForm/";
import ForgotPassword from "../forgotPassword/"


class Login extends Component {
  
  state = {
    register: false,
  };
  state = {
    forgotPassword: false,
  };

  onRegisterActive = (e) => {
    this.setState({
      register: true,
    });
  };

  onForgotPasswortActive = (e) => {
    e.preventDefault();
    this.setState({
      forgotPassword: true,
    });
  };


  render() {
    const { register, forgotPassword } = this.state;
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
                onRegisterActive={this.onRegisterActive}
                onForgotPasswortActive={this.onForgotPasswortActive}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}
export default Login;
