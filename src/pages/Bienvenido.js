import React, { Component } from "react";
import User from "../components/user/";

class Bienvenido extends Component {
  render() {
    return (
      <div>
        <User usuario={this.props.usuario} />
      </div>
    );
  }
}

export default Bienvenido;
