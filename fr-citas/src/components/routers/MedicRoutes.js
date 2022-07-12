import React from 'react';
import {HeaderMedic} from '../ui/HeaderMedic';
import { Switch, Route, Redirect } from 'react-router-dom';
import {InicioView} from '../inicio/InicioView';
import {CitasView} from '../citas/CitasView';
import {UsuarioView} from '../usuarios/UsuarioView';


export const MedicRoutes = () => {
    return (
        <>
         <HeaderMedic />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/inicio' component={InicioView} />
                    <Route exact path='/usuarios' component={UsuarioView} />
                    <Route exact path='/citas' component={CitasView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>
    )
} 