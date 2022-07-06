import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {InicioView} from './components/inicio/InicioView';
import {Login} from './components/login/Login';

const App = () =>{
  return  <Router>
  <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/inicio' component={InicioView}/>
      <Redirect to= "/"/>
  </Switch>
</Router>
  
}

export {
  App
}
