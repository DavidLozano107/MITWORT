import React from "react";
import SideBar from "../components/companyNavbar";
import TodoList from "../components/companyTodoList";
const DashboardTodoLis = () => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div style={{ position: "fixed" }} className="col-2">
            <SideBar />
          </div>
          <div className="col-9 offset-md-3 ">
            <TodoList />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTodoLis;
