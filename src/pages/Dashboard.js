import React from "react";
import User from "../components/user";

const Dashboard = ({ user }) => {
  return (
    <div>
      <User usuario={user} />
    </div>
  );
};

export default Dashboard;
