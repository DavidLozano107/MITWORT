import React, { Component } from "react";
import logo from "./img/wave1.png";
import backImage from "./img/bg.svg";

import LoginForm from "../loginForm/";
import SingUpForm from "../signUpForm/";

class Login extends Component {
  state = {
    register: false,
  };

  onRegisterActive = (e) => {
    this.setState({
      register: true,
    });
  };

  render() {
    return (
      <>
        <img className="wave" src={logo} alt="logo"></img>
        <div className="container">
          <div className="imagen">
            <img src={backImage} alt=""></img>
          </div>
          <div className="login-container">
            {/*----------------------------------------------------- */}
            {this.state.register ? (
              <SingUpForm />
            ) : (
              <LoginForm onRegisterActive={this.onRegisterActive} />
            )}
            {/* ---------------------------------------------------------------------------*/}
          </div>
        </div>
      </>
    );
  }
}
export default Login;
