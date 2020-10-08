import React from "react";
import "./style.css";

import { NavLink } from "react-router-dom";
import { auth } from "../../firebase-config";

const Navbar = ({ usuario }) => {
  const cerrarSesion = () => {
    auth.signOut();
  };

  return (
    <div className="container-Nav">
      <div className="navbar d-flex flex-column">
        <div className="navbar-wavy ">
          <svg
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            style={{ height: "100%", width: "100%" }}
          >
            <path
              d="M0.00,49.98 C131.20,274.83 271.49,-49.98 559.53,147.53 L500.00,0.00 L0.00,0.00 Z"
              style={{ stroke: "none", fill: "#63D6C1" }}
            ></path>
          </svg>
        </div>
        <div className="rowLista">
          <div className="navbar-navigation ">
            <ul>
              <li>
                <NavLink exact to="/"><span className="MenuHome">Home</span></NavLink>
              </li>
              <li>
                <NavLink to="/profile"><span className="MenuProfile">Profile</span></NavLink>
              </li>
              <li>
                <NavLink to="/chat"><span className="MenuChat">Chat</span></NavLink>
              </li>
              <li>
                <NavLink to="/comunity"><span className="MenuCommunity">Communities</span></NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="perfil">
          <div className="row">
            <div className="col-4">
              <img
                className="img-fluid rounded-circle "
                src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80"
                alt="Avatar"
              />
            </div>
            <div className="col-4 perfil">
              <p className="perfil-name">{usuario.email}</p>
            </div>
            <div className="col-4 logOut">
              <button
                className="btn btn-dark perfil-btn"
                onClick={() => cerrarSesion()}
              >Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
