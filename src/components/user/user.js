import React, { Component } from "react";

class index extends Component {
  render() {
    const { usuario } = this.props;
    return (
      <div>
        <h1>Welcome</h1>
        <p>Nombre : {usuario.nickname} </p>
      </div>
    );
  }
}

export default index;