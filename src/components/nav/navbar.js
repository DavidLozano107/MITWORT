import React from "react";
import "./style.css";

import { Link, NavLink } from "react-router-dom";
import { auth } from "../../firebase-config";

const Navbar = ({ usuario }) => {
  const cerrarSesion = () => {
    auth.signOut();
  };

  return (
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
      <div className="row">
        <div className="navbar-navigation ">
          <ul>
            <NavLink exact to="/">
              home
            </NavLink>
            <li>Lorem</li>
            <NavLink to="/Profile">Profile</NavLink>
            <NavLink to="/comunity">Chat</NavLink>
            <li>Lorem</li>
            <NavLink to="/comunity">Communities</NavLink>
          </ul>
        </div>
      </div>
      <div className="perfil">
        <div className="row">
          <div className="col-4">
            <img
              className="img-fluid rounded-circle "
              src="https://www.w3schools.com/howto/img_avatar.png"
              alt="Avatar"
            />
          </div>
          <div className="col-4">
            <p className="perfil-name">{usuario.email}</p>
          </div>
          <div className="col-4">
            <button
              className="btn btn-dark perfil-btn"
              onClick={() => cerrarSesion()}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
