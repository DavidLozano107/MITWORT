import React, { useState } from "react";
import Login from "../components/login/";
import Dashboard from "./Dashboard";
import "../components/login/styleFormLogin.css";

const usuario = {
  nickname: "David lozano",
};

const Home = () => {
  const [login, setLogin] = useState(false);

  const loginAct = () => {
    setLogin(true);
  };

  if (login) {
    return <Dashboard usuario={usuario} />;
  } else {
    return <Login onIngreso={loginAct} />;
  }
};

export default Home;
