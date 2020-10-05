import React from "react";
import User from "../components/user";

import { auth } from "../firebase-config";

const Dashboard = ({ user }) => {
  const cerrarSesion = () => {
    auth.signOut();
  };

  return (
    <div>
      <User usuario={user} />

      <button className="btn btn-dark" onClick={() => cerrarSesion()}>
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
