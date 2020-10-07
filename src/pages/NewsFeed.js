import React from "react";

import History from "../components/History";
import User from "../components/user";

const NewsFeed = ({ usuario }) => {
  return (
    <>
      <h1>Hola</h1>
      <User usuario={usuario} />
      <History />
    </>
  );
};

export default NewsFeed;
