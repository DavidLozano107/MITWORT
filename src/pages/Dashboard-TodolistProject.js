import React from "react";
import SideBar from "../components/companyNavbar";
const TodoListProject = ({}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div style={{ position: "fixed" }} className="col-2">
            <SideBar />
          </div>
          <div className="col-9 offset-md-3 ">
            <h1>Titulo del proyecto</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodoListProject;
