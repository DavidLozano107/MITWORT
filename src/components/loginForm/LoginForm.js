import React, { Component } from "react";

import logoHome from "./img/avatarMit.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";

export default class Login extends Component {
  render() {
    return (
      <div>
        <form>
          <img className="avatar" src={logoHome} alt="MITWORT"></img>
          <h2>WELCOME</h2>
          <div className="input-div one">
            <div className="i">
              <i className="fas fa-user">
                <FontAwesomeIcon icon={faUser} />
              </i>
            </div>
            <div>
              <input className="input" type="text" placeholder="Email"></input>
            </div>
          </div>
          <div className="input-div two">
            <div className="i">
              <i className="fas fa-password">
                <FontAwesomeIcon icon={faLock} />
              </i>
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Password"
              ></input>
            </div>
          </div>
          <button>Forwort Password</button>

          <button onClick={this.props.onRegisterActive}>Sign Up</button>
          <input
            className="btn"
            type="submit"
            value="Login"
            // onClick={onIngreso}
          ></input>
        </form>
      </div>
    );
  }
}
