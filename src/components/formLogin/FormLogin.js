import React, { Component } from "react";
import "./styleFormLogin.css"
import logo from "./img/wave1.png"
import backImage from "./img/bg.svg"
import logoHome from "./img/avatarMit.svg"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faUser, faLock} from "@fortawesome/free-solid-svg-icons"



class FormLogin extends Component {
  render() {
    
    const { onIngreso } = this.props;

    return (
      <>
      <img className="wave" src={logo} alt="logo"></img>
      <div className="container">
        <div className="imagen">
          <img src={backImage} alt=""></img>
        </div>
        <div className="login-container">
          <form action="#">
            <img className="avatar" src={logoHome} alt="MITWORT"></img>
            <h2>WELCOME</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"><FontAwesomeIcon icon={faUser} /></i>
              </div>
              <div>
                  <input className="input" type="text" placeholder="Username"></input>
              </div>
            </div>
            <div className="input-div two">
              <div className="i">
                <i className="fas fa-password"><FontAwesomeIcon icon={faLock} /></i>
              </div>
              <div>
                  <input className="input" type="text" placeholder="Password"></input>
              </div>
            </div>
            <a href="#">Forwort Password</a>
            <a href="#">Sign Up</a>
            <input className="btn" type="submit" value="Login" onClick={onIngreso}></input>
          </form>
        </div>
      </div>
      </>
    );
  }
}
export default FormLogin;
