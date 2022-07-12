import React from 'react';
import {HeaderAdmin} from '../ui/HeaderAdmin';
import { Switch, Route, Redirect } from 'react-router-dom';
import {InicioView} from '../inicio/InicioView';
import {UsuarioView} from '../usuarios/UsuarioView';
import {CitasView} from '../citas/CitasView';
import {ConsultasView} from '../consultas/ConsultasView';
import {DescuentoView} from '../descuentos/DescuentoView';
import {EspecialidadView} from '../especialidades/EspecialidadView';
import {TratamientosView} from '../tratamientos/TratamientosView';



export const AdminRoutes = () => {
    return (
        <>
         <HeaderAdmin />

            <div className="container mt-2">
                <Switch>
                    <Route exact path='/inicio' component={InicioView} />
                    <Route exact path='/usuarios' component={UsuarioView} />
                    <Route exact path='/citas' component={CitasView} />
                    <Route exact path='/consultas' component={ConsultasView} />
                    <Route exact path='/descuentos' component={DescuentoView} />
                    <Route exact path='/especialidades' component={EspecialidadView} />
                    <Route exact path='/tratamientos' component={TratamientosView} />
                    <Redirect to="/inicio" />
                </Switch>
            </div>
        </>
    )
} 