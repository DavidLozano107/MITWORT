import React, { Component } from "react";

import FormLogin from "../components/formLogin/";

export default class Login extends Component {
  render() {
    const { onIngreso } = this.props;
    return (
      <div>
        <FormLogin />
      </div>
    );
  }
}
