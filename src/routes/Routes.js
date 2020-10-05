import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
import Home from "../pages/Home";
import Page404 from "../pages/Page404";

function Routes() {
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default Routes;
