import React, {useState} from 'react';
import '../../assets/css/CitasView.css';
import {ConsultasCreation} from './ConsultasCreation';
import {ConsultasEdition} from './ConsultasEdition';
import {ConsultasLista} from './ConsultasLista';


export const ConsultasView = () => {

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
               modal = <ConsultasCreation handleCloseModal={handleCloseModal}/> ;
               vista = 'crear';
               break;

          case 'listar':
               modal = <ConsultasLista handleCloseModal={handleCloseModal}/> ;
               vista = 'listar';
               break;

          case 'editar':
               modal = <ConsultasEdition handleCloseModal={handleCloseModal}/> ;
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
                              <h2 className="transition-esp" >Crear consulta</h2>
                              <p id="parrafo-card">Creación de parámetro en el sistema para consulta.</p>
                              <div className="cta-container transition-esp">
                                   
                              <button href="#" className="cta" onClick={handleModalCrear}>Crear</button></div>

                              <div className="card-esp_circle_crear transition-esp"></div>
                         </div>

                         <div className="card-esp transition-esp">
                              <h2 className="transition-esp" >Listar consulta</h2>
                              <p id="parrafo-card">Listado de consultas creadas en el sistema.</p>
                              <div className="cta-container transition-esp">
                                   
                              <button href="#" className="cta" onClick={handleModalListar}>Listar</button></div>

                              <div className="card-esp_circle_list transition-esp"></div>
                         </div>

                         <div className="card-esp transition-esp">
                              <h2 className="transition-esp" >Editar consulta</h2>
                              <p id="parrafo-card">Edición de una consulta existente que permite actualizar información del sistema.</p>
                              <div className="cta-container transition-esp">
                                   
                                   <button href="#" className="cta" onClick={handleModalEditar}>Editar</button></div>

                              <div className="card-esp_circle_edit transition-esp"></div>
                         </div>
                    
                    </div>

            }
     </div>
  )
}
