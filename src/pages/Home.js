import React, { Component } from "react";
import Login from "../components/login/";
import Dashboard from "./Dashboard";
import "../components/login/styleFormLogin.css";

const usuario = {
  nickname: "David lozano",
};

class Home extends Component {
  state = {
    login: false,
  };

  login = () => {
    this.setState({
      login: true,
    });
  };

  render() {
    const { login } = this.state;
    if (login) {
      return <Dashboard usuario={usuario} />;
    } else {
      return <Login onIngreso={this.login} />;
    }
  }
}

export default Home;
