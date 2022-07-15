import React, {useState} from 'react';
import '../../assets/css/CitasView.css';
import {CitaCreation} from './CitaCreation';
import {CitaList} from './CitaList';
import {CitaRepro} from './CitaRepro';
import {CitaSearch} from './CitaSearch';
import {CitaPay} from './CitaPay';
import { CitaCancel } from './CitaCancel';


export const CitasView = () => {

const [openModal, setOpenModal] = useState('');

const handleCloseModal = () => {
  setOpenModal('');
}

const handleModalCrear = () => {
    setOpenModal('crear');
}

const handleModalListar = () => {
  setOpenModal('listar');
}

const handleModalRepro = () => {
  setOpenModal('repro');
}

const handleModalSearch = () => {
  setOpenModal('busqueda');
}

const handleModalPay = () => {
  setOpenModal('pagar');
}

const handleModalCancel = () => {
  setOpenModal('cancelar');
}

let modal;
let vista;

switch(openModal){
        case 'crear':
            modal = <CitaCreation handleCloseModal={handleCloseModal}/> ;
            vista = 'crear';
            break;
        case 'listar':
            modal = <CitaList handleCloseModal={handleCloseModal}/> ;
            vista = 'listar';
            break;
        case 'repro':
            modal = <CitaRepro handleCloseModal={handleCloseModal}/> ;
            vista = 'repro';
            break;
        case 'busqueda':
            modal = <CitaSearch handleCloseModal={handleCloseModal}/> ;
            vista = 'busqueda';
            break;
        case 'pagar':
            modal = <CitaPay handleCloseModal={handleCloseModal}/> ;
            vista = 'pagar';
            break;
        case 'cancelar':
            modal = <CitaCancel handleCloseModal={handleCloseModal}/> ;
            vista = 'cancelar';
            break;
        default: 
            modal = undefined ;  
}

  return (
    <div>

    {openModal === vista  ? modal : 
         
    <div className="row">


          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Creación de cita médica</h2>
              <p id="parrafo-card">Creación de cita médica para un paciente.</p>
              <div className="cta-container transition-esp">
               
                <button href="#" className="cta" onClick={handleModalCrear}>Crear</button>
               
                </div>
              <div className="card-esp_circle_crear_cita transition-esp"></div>
          </div>
          
    

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Reprogramación de cita médica</h2>
              <p id="parrafo-card">Cambia la fecha, hora y/o médico de una cita médica.</p>
              <div className="cta-container transition-esp">
              
                <button href="#" className="cta" onClick={handleModalRepro}>Reprogramar</button>
                
                </div>
              <div className="card-esp_circle_repro_cita transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Búsqueda de cita médica</h2>
              <p id="parrafo-card">Búsqueda de cita médica de acuerdo a un criterio seleccionado.</p>
              <div className="cta-container transition-esp">
              
                <button href="#" className="cta" onClick={handleModalSearch}>Buscar cita</button>
                </div>
              <div className="card-esp_circle_search transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Listar citas médicas</h2>
              <p id="parrafo-card">Listado de todas las citas. Se pueden ordenar por uno de los criterios seleccionados.</p>
              <div className="cta-container transition-esp">
              
                <button href="#" className="cta" onClick={handleModalListar} >Listar</button>
                </div>
              <div className="card-esp_circle_list transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Pagar cita médica</h2>
              <p id="parrafo-card">Pagar cita de un paciente con el fin de tener un recaudo por los servicios ofrecidos.</p>
              <div className="cta-container transition-esp">
              
                <button href="#" className="cta" onClick={handleModalPay}>Pagar cita</button>
                </div>
              <div className="card-esp_circle_pay transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Cancelar cita médica</h2>
              <p id="parrafo-card">Cancelación de cita médica cuando un paciente no pueda asistir.</p>
              <div className="cta-container transition-esp">
                
                <button href="#" className="cta" onClick={handleModalCancel}>Cancelar cita</button>
                </div>
              <div className="card-esp_circle_cancel transition-esp"></div>
          </div>

  </div>
  }
  </div>
  )
}
 