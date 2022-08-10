import React, {useState} from 'react';
import '../../assets/css/StyleCard.css';
import {EspecialidadCreation} from './EspecialidadCreation';
import {EspecialidadEdition} from './EspecialidadEdition';
import {EspecialidadLista} from './EspecialidadLista';

export const EspecialidadView = () => {

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
     
     const handleModalEditar = () => {
       setOpenModal('editar');
     }
 
     let modal;
     let vista;
 
     switch(openModal){
          case 'crear':
               modal = <EspecialidadCreation handleCloseModal={handleCloseModal}/> ;
               vista = 'crear';
               break;

          case 'listar':
               modal = <EspecialidadLista handleCloseModal={handleCloseModal}/> ;
               vista = 'listar';
               break;

          case 'editar':
               modal = <EspecialidadEdition handleCloseModal={handleCloseModal}/> ;
               vista = 'editar';
               break;
               
             default: 
                 modal = undefined ;  
     }

  return (

     <div>
               {openModal === vista  ? modal :

               <div className="row">

               <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Crear especialidad</h2>
                         <p id="parrafo-card">Creación de parámetro en el sistema para especialidad.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalCrear}>Crear</button></div>
                              
                         <div className="card-esp_circle_crear transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Listar especialidad</h2>
                         <p id="parrafo-card">Listado de especialidades creadas en el sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalListar}>Listar</button></div>

                         <div className="card-esp_circle_list transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Editar especialidad</h2>
                         <p id="parrafo-card">Edición de una especialidad existente que permite actualizar información del sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalEditar}>Crear</button></div>

                         <div className="card-esp_circle_edit transition-esp"></div>
                    </div>
               
               </div>

               }
               </div>

  )
}
