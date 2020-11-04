import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
// import Pagina from "../pages/Page404";
import OpenCommunity from "../components/openCommunity";

//Pages
//import Page404 from "../pages/Page404"; <-- Mirar como importar esta pagina

import { auth } from "../firebase-config";

import Login from "../components/login";
import Navbar from "../components/nav";
import ProfileUser from "../components/profile/";
import NavCommunity from "../components/navCommunity";

import NewsFeed from "../pages/NewsFeed";
import Comunity from "../pages/comunity";
import Dashboard from "../pages/Dashboard";
import DashboardPublication from "../pages/Dashboard-publication";
import DashboardStatics from "../pages/Dashboard-statics";

// import userEvent from "@testing-library/user-event";

// const Prueba = (props) => {
//   useEffect(() => {
//     const {
//       match: { params },
//     } = props;
//     console.log(params);
//     return () => {};
//   }, []);

//   return <h1 className="text-center">Hello World!</h1>;
// };

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
                    <NewsFeed />
                  </div>
                </Route>
                <Route path="/profile">
                  <div className="col-sm-6 ">
                    <ProfileUser user={user} />
                  </div>
                </Route>

                <Route path="/comunity/:id" exact>
                  <div className="col-sm-9 ">
                    <OpenCommunity user={user} />
                  </div>
                </Route>
                <Route path="/comunity" exact>
                  <div className="col-sm-9 ">
                    <Comunity />
                  </div>
                </Route>
                <Route path="/dashboard" exact>
                  <div className="col-sm-9 ">
                    <Dashboard />
                  </div>
                </Route>
                <Route path="/dashboard/publication" exact>
                  <div className="col-sm-9 ">
                    <DashboardPublication />
                  </div>
                </Route>
                <Route path="/dashboard/statistics" exact>
                  <div className="col-sm-9 ">
                    <DashboardStatics />
                  </div>
                </Route>
              </Switch>

              <Route path="/" exact>
                <div className="col-sm-3">
                  <NavCommunity user={user} />
                </div>
              </Route>

              <Route path="/profile">
                <div className="col-sm-3">
                  <NavCommunity user={user} />
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
