import React from "react";
// import { BrowserRouter, Route, Switch } from "react-router-dom";
import SideBar from "../components/companyNavbar";
// import Content from "../components/companyContent";
import Statics from "../components/companyStatics";
const Dashboard = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div style={{ position: "fixed" }} className="col-2">
            <SideBar />
          </div>
          <div className="col-9 offset-md-3 ">
            <Statics />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
