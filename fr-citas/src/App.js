import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {Login} from './components/login/Login';
import { InicioRoutes } from "./components/routers/InicioRoutes";
import { PrivateRoute } from "./components/routers/PrivateRoute";
import { PublicRoute } from "./components/routers/PublicRoute";

const init = () => {
    return localStorage.getItem('token') ? {logged: true} : {logged: false};
}

const App = () =>{

const [user, setUser] = useState(init());

  return  <Router>
  <div>
      <Switch>
          <PublicRoute
              isAuth={user.logged }
              exact
              path="/"
              component={Login}
          />
          <PrivateRoute
              isAuth={user.logged }
              //exact
              //path="/inicio"
              component={InicioRoutes}
          />

          <Redirect to="/" />
      </Switch>
  </div>
</Router>
}
  


export {
  App
}
