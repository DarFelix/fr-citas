import React from 'react';
import {HeaderCash} from '../ui/HeaderCash';
import { Switch, Route, Redirect } from 'react-router-dom';
import {InicioView} from '../inicio/InicioView';
import {MedicView} from '../medicos/MedicView';


export const CashRoutes = () => {
    return (
        <>
         <HeaderCash />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/inicio' component={InicioView} />
                    <Route exact path='/medic' component={MedicView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>
    )
} 