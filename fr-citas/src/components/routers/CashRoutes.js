import React from 'react';
import {HeaderCash} from '../ui/HeaderCash';
import { Switch, Route, Redirect } from 'react-router-dom';
import {InicioView} from '../inicio/InicioView';
import {CitasView} from '../citas/CitasView';


export const CashRoutes = () => {
    return (
        <>
         <HeaderCash />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/inicio' component={InicioView} />
                    <Route exact path='/citas' component={CitasView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>
    )
} 