import React, { Component } from "react";

import FormLogin from "../components/formLogin/";
import SignUp from "../components/signUp";


export default class Login extends Component {
  state = {
    register: true,
  };

  onRegister = (e) => {
    e.preventDefault();
    this.setState({
      register: true,
    });
  };

  render() {
    
    (this.state.register)?<SignUp /> :<FormLogin onRegister={this.onRegister}/>
        

        
      
  }
}
