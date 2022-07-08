import React from 'react';
import {Header} from '../ui/Header';
import { Switch, Route, Redirect } from 'react-router-dom';
import {MedicView} from '../medicos/MedicView';
import {UsuarioView} from '../usuarios/UsuarioView';

export const InicioRoutes = () => {
    return (
        <>
         <Header />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/medic' component={MedicView} />
                    <Route exact path='/usuario' component={UsuarioView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>

        </>
    )
}