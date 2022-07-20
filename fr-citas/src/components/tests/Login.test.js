import React from 'react';
import { shallow, mount } from 'enzyme';
import {Login} from '../login/Login';
import {setupTests} from '../setupTests';
import {CitasView} from '../citas/CitasView';
import {CitaCreation} from '../citas/CitaCreation';
import {spy} from 'sinon';
import { App } from '../../App';
import {PrivateRoute} from '../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';



describe('prueba de login', () => {

    it("debería leer los elementos con la clase fadeIn", () => {
        const wrapper = shallow(<Login/>);

        expect(wrapper.find(".fadeIn").length).toEqual(4);
    });

});

describe('prueba de vista citas', () => {

    it("debería mostrar una modal al presionar el boton de crear cita", () => {
        const wrapper = shallow(<CitasView/>);
        const crearBoton = wrapper.find('#crear-cita-bt');

        expect(crearBoton).toBeDefined();
        crearBoton.simulate('click');
        expect(wrapper.find('CitaCreation')).toBeDefined();

    });

    it("debería mostrar una modal al presionar el boton de listar citas", () => {
        const wrapper = shallow(<CitasView/>);
        const botonLista = wrapper.find('#lista-cita-bt');

        expect(botonLista).toBeDefined();
        botonLista.simulate('click');
        expect(wrapper.find('CitaList')).toBeDefined();

    });



});


