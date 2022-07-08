import React from 'react';
import {Header} from '../ui/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import {InicioView} from '../inicio/InicioView';
import {UsuarioView} from '../usuarios/UsuarioView';
import {MedicView} from '../medicos/MedicView';
import {AdminView} from '../admin/AdminView';
import {Login} from '../login/Login';


export const InicioRoutes = () => {
    return (
        <>
         <Header />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/inicio' component={InicioView} />
                    <Route exact path='/usuario' component={UsuarioView} />
                    <Route exact path='/medic' component={MedicView} />
                    <Route exact path='/admin' component={AdminView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>
    )
} 