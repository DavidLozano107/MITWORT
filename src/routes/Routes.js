import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//Pages
//import Page404 from "../pages/Page404"; <-- Mirar como importar esta pagina

import { auth } from "../firebase-config";

import Login from "../components/login";
import Navbar from "../components/nav";
import ProfileUser from "../components/profile/";
import NavCommunity from "../components/navCommunity";

import NewsFeed from "../pages/NewsFeed";
import Comunity from "../pages/comunity";
import Chat from "../components/chat";
import NavChat from "../components/navChat";

const Prueba = () => {
  return <h1 className="text-center">Hello World!</h1>;
};

function Routes() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    auth.onAuthStateChanged((user) => {
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
              <Switch>
                <Route path="/" exact>
                  <div className="col-sm-6 ">
                    <NewsFeed usuario={user} />
                  </div>
                </Route>
                <Route path="/profile">
                  <div className="col-sm-6 ">
                    <ProfileUser />
                  </div>
                </Route>

                <Route path="/chat">
                  <div className="col-sm-6">
                    <Chat />
                  </div>
                </Route>

                <Route path="/comunity/id:1" exact>
                  <div className="col-sm-9 ">
                    <Prueba />
                  </div>
                </Route>
                <Route path="/comunity" exact>
                  <div className="col-sm-9 ">
                    <Comunity />
                  </div>
                </Route>
              </Switch>

              <Route path="/" exact>
                <div className="col-sm-3">
                  <NavCommunity />
                </div>
              </Route>

              <Route path="/chat">
                <div className="col-sm-3">
                  <NavChat />
                </div>
              </Route>
              <Route path="/profile">
                <div className="col-sm-3">
                  <NavCommunity />
                </div>
              </Route>
            </div>
          </div>
        </>
      )}

      {user === null && (
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      )}
    </BrowserRouter>
  );
}

export default Routes;
