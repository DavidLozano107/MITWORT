import React, { Component } from "react";
import Form from "../components/formLogin/FormLogin"
import Bienvenido from "./Bienvenido";

const usuario = {
  nickname: "David lozano",
};

class Home extends Component {
  state = {
    login: false,
  }

  login = () => {
    this.setState({
      login: true,
    });
  }



  render() {
    const { login } = this.state;
    if (login) {
      return <Bienvenido usuario={usuario} />;
    } else {
      return <Form onIngreso={this.login} />;
    }
  }
}

export default Home;
