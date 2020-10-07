import React from "react";
import "./style.css";

const NavbarCommunity = () => {
  return (
    <>
      <div className="navbarCommunity d-flex flex-column ">
        <div className="row ">
          <div className="col text">
            <h1>Mis Comunidades</h1>
          </div>
        </div>
        <div className="container">
          <div className="row ">
            <div className="col">
              <div className="navbarCommunity-cardCommunity"></div>
            </div>
          </div>

          <div className="row ">
            <div className="col">
              <div className="navbarCommunity-cardCommunity"></div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className="navbarCommunity-cardCommunity"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarCommunity;
