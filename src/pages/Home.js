import React, { useState } from "react";
import Login from "../components/login/";
import Dashboard from "./Dashboard";
import "../components/login/styleFormLogin.css";

import { auth } from "../firebase-config";

const Home = (props) => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);
  console.log(user);

  if (user === null) {
    return <Login />;
  } else {
    return <Dashboard user={user} />;
  }
};

export default Home;
