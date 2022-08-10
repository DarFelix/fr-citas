import React, {useState} from 'react';
import '../../assets/css/StyleCard.css';
import {TratamientoCreation} from './TratamientoCreation';
import {TratamientoEdition} from './TratamientoEdition';
import {TratamientoLista} from './TratamientoLista';

export const TratamientosView = () => {

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
               modal = <TratamientoCreation handleCloseModal={handleCloseModal}/> ;
               vista = 'crear';
               break;

          case 'listar':
               modal = <TratamientoLista handleCloseModal={handleCloseModal}/> ;
               vista = 'listar';
               break;

          case 'editar':
               modal = <TratamientoEdition handleCloseModal={handleCloseModal}/> ;
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
                         <h2 className="transition-esp" >Crear tratamiento</h2>
                         <p id="parrafo-card">Creación de parámetro en el sistema para tratamiento.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalCrear}>Crear</button></div>

                         <div className="card-esp_circle_crear transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Listar tratamientos</h2>
                         <p id="parrafo-card">Listado de tratamientos creados en el sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalListar}>Listar</button></div>

                         <div className="card-esp_circle_list transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Editar tratamiento</h2>
                         <p id="parrafo-card">Edición de un tratamiento existente que permite actualizar información del sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalEditar}>Editar</button></div>

                         <div className="card-esp_circle_edit transition-esp"></div>
                    </div>
               
               </div>

     }
     </div>

  )
}
