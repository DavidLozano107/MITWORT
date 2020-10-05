import React from "react";

const index = ({ usuario }) => {
  return (
    <div>
      <h1>Welcome</h1>
      <p>Nombre : {usuario.email} </p>
    </div>
  );
};

export default index;
