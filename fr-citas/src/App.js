import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {InicioView} from './components/inicio/InicioView';
import {Login} from './components/login/Login';
import { PrivateRoute } from "./components/routers/PrivateRoute";
import { PublicRoute } from "./components/routers/PublicRoute";

const init = () => {
  return localStorage.getItem('token') ? {loggged: true} : {logged: false};
}



const App = () =>{

  const [user, setUser] = useState(init());
  
  return  <Router>
  <div>
      <Switch>
          <PublicRoute
              isAuth={user.logged ? true : false}
              exact
              path="/"
              component={Login}
          />
          <PrivateRoute
              isAuth={user.logged ? true : false}
              exact
              path="/inicio"
              component={InicioView}
          />

          <Redirect to="/" />
      </Switch>
  </div>
</Router>
}
  


export {
  App
}
