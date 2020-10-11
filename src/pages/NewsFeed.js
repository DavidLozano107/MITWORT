import React from "react";

import History from "../components/History";
import User from "../components/user";

const NewsFeed = ({ user }) => {
  return (
    <>
      <h1>Hola</h1>
      <User user={user} />
      <History />
    </>
  );
};

export default NewsFeed;
