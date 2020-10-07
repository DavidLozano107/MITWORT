import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
import Page404 from "../pages/Page404";

import { auth } from "../firebase-config";

import Login from "../components/login";
import Navbar from "../components/nav";
import avCommunity from "../components/navCommunity";

import NewsFeed from "../pages/NewsFeed";
import Comunity from "../pages/comunity";

function Routes() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      {user !== null && (
        <>
          <div className="container-fluid mt-2">
            <div className="row">
              <div className="col-sm-3">
                <Navbar usuario={user} />
              </div>
              <div className="col-sm-6">
                <Switch>
                  <Route path="/" exact>
                    <NewsFeed usuario={user} />
                  </Route>
                  <Route path="/comunity" component={Comunity} />
                </Switch>
              </div>
            </div>
          </div>
        </>
      )}

      {user === null && (
        <Switch>
          <Route path="/" exact component={Login}></Route>
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default Routes;
