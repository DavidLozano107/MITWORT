import React from "react";

const index = ({ user }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Nombre : {user.email} </p>
    </div>
  );
};

export default index;
