import React, { Component } from "react";
import User from "../components/user";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <User usuario={this.props.usuario} />
      </div>
    );
  }
}

export default Dashboard;
