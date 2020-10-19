import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Pagina from "../pages/Page404"

//Pages
//import Page404 from "../pages/Page404"; <-- Mirar como importar esta pagina

import { auth } from "../firebase-config";

import Login from "../components/login";
import Navbar from "../components/nav";
import ProfileUser from "../components/profile/";
import NavCommunity from "../components/navCommunity";

import NewsFeed from "../pages/NewsFeed";
import Comunity from "../pages/comunity";



const Prueba = () => {
  return <h1 className="text-center">Hello World!</h1>;
};

function Routes() {
  const [user, setUser] = React.useState(false);

  React.useEffect(() => {
    const consultarUsuario = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }
      });
    };
    consultarUsuario();
  }, []);

  return user !== false ? (
    <BrowserRouter>
      {user !== null && (
        <>
          <div className="container-fluid mt-2">
            <div className="row">
              <div className="col-sm-3">
                <Navbar user={user} />
              </div>
              <Switch>
                <Route path="/" exact>
                  <div className="col-sm-6 ">
                    <NewsFeed user={user} />
                  </div>
                </Route>
                <Route path="/profile">
                  <div className="col-sm-6 ">
                    <ProfileUser user={user} />
                  </div>
                </Route>

                <Route path="/comunity/1602885039788" exact>
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
  ) : (
    <h1>Cargando...</h1>
  );
}

export default Routes;
