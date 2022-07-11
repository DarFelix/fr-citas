import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {Login} from './components/login/Login';
import { InicioRoutes } from "./components/routers/InicioRoutes";
import { PrivateRoute } from "./components/routers/PrivateRoute";
import { PublicRoute } from "./components/routers/PublicRoute";
import {CashRoutes} from "./components/routers/CashRoutes";

const init = () => {
    return localStorage.getItem('token') ? {logged: true} : {logged: false};
}

const extractRol = () => {
    return localStorage.getItem('role');
}




const App = () =>{

const [user, setUser] = useState(init());
const [role, setRole] = useState(extractRol());
const [compo, setCompo] = useState();

let modulo ;

if(role === 'ADMIN'){
   modulo = InicioRoutes;
}else{
    modulo = CashRoutes;
}


console.log(modulo);


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
              
              component={modulo}
              
          />

          <Redirect to="/" />
      </Switch>
  </div>
</Router>
}
  


export {
  App
}
