import React, {useState} from 'react';
import '../../assets/css/StyleCard.css';
import {DescuentoCreation} from './DescuentoCreation';
import {DescuentoLista} from './DescuentoLista';
import {DescuentoEdition} from './DescuentoEdition';

export const DescuentoView = () => {

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
               modal = <DescuentoCreation handleCloseModal={handleCloseModal}/> ;
               vista = 'crear';
               break;

          case 'listar':
               modal = <DescuentoLista handleCloseModal={handleCloseModal}/> ;
               vista = 'listar';
               break;

          case 'editar':
               modal = <DescuentoEdition handleCloseModal={handleCloseModal}/> ;
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
                         <h2 className="transition-esp" >Crear descuento</h2>
                         <p id="parrafo-card">Creación de parámetro en el sistema para descuento.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalCrear}>Crear</button></div>

                         <div className="card-esp_circle_crear transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Listar descuento</h2>
                         <p id="parrafo-card">Listado de descuentos creados en el sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalListar}>Listar</button></div>

                         <div className="card-esp_circle_list transition-esp"></div>
                    </div>

                    <div className="card-esp transition-esp">
                         <h2 className="transition-esp" >Editar descuento</h2>
                         <p id="parrafo-card">Edición de un descuento existente que permite actualizar información del sistema.</p>
                         <div className="cta-container transition-esp">
                              
                              <button href="#" className="cta" onClick={handleModalEditar}>Editar</button></div>

                         <div className="card-esp_circle_edit transition-esp"></div>
                    </div>

               </div>

          }

          </div>


  )
}
