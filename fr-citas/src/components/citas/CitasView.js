import React, {useState} from 'react';
import '../../assets/css/CitasView.css';
import {CitaCreation} from './CitaCreation';
import {CitaList} from './CitaList';

export const CitasView = () => {


const [openModal, setOpenModal] = useState(false);



const handleModal = () => {
    setOpenModal(!openModal)
}


let comp;

if(openModal){
  comp = <CitaList handleModal={handleModal}/> ;
}

if(openModal){ 
  comp = <CitaCreation handleModal={handleModal}/> ;
}








  return (
    <div>
      
    {
         openModal  ? comp : 
         

    <div className="row">


          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Creación de cita médica</h2>
              <p id="parrafo-card">Creación de cita médica para un paciente.</p>
              <div className="cta-container transition-esp">
               
                <button href="#" className="cta" onClick={handleModal}>Crear</button>
               
                </div>
              <div className="card-esp_circle_crear_cita transition-esp"></div>
          </div>
          
    

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Reprogramación de cita médica</h2>
              <p id="parrafo-card">Cambia la fecha, hora y/o médico de una cita médica.</p>
              <div className="cta-container transition-esp">
              
                <a href="#" className="cta">Reprogramar</a>
                
                </div>
              <div className="card-esp_circle_repro_cita transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Búsqueda de cita médica</h2>
              <p id="parrafo-card">Búsqueda de cita médica de acuerdo a un criterio seleccionado.</p>
              <div className="cta-container transition-esp">
              
                <a href="#" className="cta">Buscar cita</a>
                </div>
              <div className="card-esp_circle_search transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Listar citas médicas</h2>
              <p id="parrafo-card">Listado de todas las citas. Se pueden ordenar por uno de los criterios seleccionados.</p>
              <div className="cta-container transition-esp">
              
                <button href="#" className="cta" onClick={handleModal}>Listar</button>
                </div>
              <div className="card-esp_circle_list transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Pagar cita médica</h2>
              <p id="parrafo-card">Pagar cita de un paciente con el fin de tener un recaudo por los servicios ofrecidos.</p>
              <div className="cta-container transition-esp">
              
                <a href="#" className="cta">Pagar cita</a>
                </div>
              <div className="card-esp_circle_pay transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Cancelar cita médica</h2>
              <p id="parrafo-card">Cancelación de cita médica cuando un paciente no pueda asistir.</p>
              <div className="cta-container transition-esp">
                
                <a href="#" className="cta">Cancelar cita</a>
                </div>
              <div className="card-esp_circle_cancel transition-esp"></div>
          </div>

  </div>
  }
  </div>
  )
}
 