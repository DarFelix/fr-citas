import React, {useState} from "react";
import { BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import {Login} from './components/login/Login';
import { PrivateRoute } from "./components/routers/PrivateRoute";
import { PublicRoute } from "./components/routers/PublicRoute";
import {CashRoutes} from "./components/routers/CashRoutes";
import {AdminRoutes} from './components/routers/AdminRoutes';
import {MedicRoutes} from './components/routers/MedicRoutes';
import { TratamientosView } from "./components/tratamientos/TratamientosView";

const init = () => {
    return localStorage.getItem('token') ? {logged: true} : {logged: false};
}

const extractRol = () => {
    return localStorage.getItem('role');
}


const App = () =>{

const [user, setUser] = useState(init());
const [role, setRole] = useState(extractRol());

let modulo ;

switch (role) {
    case 'ADMIN':
        modulo = AdminRoutes;
        break;
    case 'CASHIER':
        modulo = CashRoutes;
        break;
    case 'MEDIC':
        modulo = MedicRoutes;
        break;
    default:
        modulo = Login;

}

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
