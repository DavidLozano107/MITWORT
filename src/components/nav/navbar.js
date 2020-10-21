import React, { useEffect, useState } from "react";
import "./style.css";

import { NavLink, Link } from "react-router-dom";
import { auth } from "../../firebase-config";

import { db } from "../../firebase-config";

const Navbar = ({ user }) => {
  //console.log(user);

  const { email } = user;

  const [userDB, setUserDb] = useState({});

  useEffect(() => {
    const readData = async () => {
      const userDB = await db.collection("usuarios").doc(email).get();
      setUserDb(userDB.data());
    };

    readData();

    return () => {};
  }, [user]);

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
                <NavLink exact to="/">
                  <span className="MenuHome">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/profile">
                  <span className="MenuProfile">Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/comunity">
                  <span className="MenuCommunity">Communities</span>
                </NavLink>
              </li>
              {//userDB.company === true && Crea error al momento de que otro perfil no tiene activado la compañia
                <li>
                  <NavLink to="/comunity">
                    <span className="MenuCommunity">Company</span>
                  </NavLink>
                </li>
              }
            </ul>
          </div>
        </div>
        <div className="perfil">
          <div className="row">
            <div className="col-4">
              <Link to="/profile">
                <img
                  className="img-fluid rounded-circle "
                  src={user.photoURL}
                  alt="Avatar"
                />
              </Link>
            </div>
            <div className="col-4 perfil">
              <Link to="/profile">
                <p className="perfil-name">{user.displayName}</p>
              </Link>
            </div>
            <div className="col-4 logOut">
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
    </div>
  );
};

export default Navbar;
