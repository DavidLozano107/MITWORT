import React from "react";
import User from "../components/user";

import { auth } from "../firebase-config";

import Navbar from "../components/nav";
import NavbarCommunity from "../components/navCommunity";
import History from "../components/History";

const Dashboard = ({ user }) => {
  const cerrarSesion = () => {
    auth.signOut();
  };

  return (
    <>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-sm-3">
            <Navbar usuario={user} />
          </div>
          <div className="col-sm-6">
            <User usuario={user} />
            <button className="btn btn-dark" onClick={() => cerrarSesion()}>
              Cerrar Sesión
            </button>
            <History />
          </div>
          <div className="col-sm-3">
            <NavbarCommunity />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
