import React from 'react';
import '../../assets/css/StyleModal.css';

export const UsuarioEdition = ({handleCloseModal}) => {
  return (
    <div className='modal-style'>
    <div className='container-fluid'>

     <div className='row'>
       <div className='col'>
         <div className='modal-style-header'>
           <h3>Editar usuario</h3>
           <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
         </div>
         <hr/>
       </div>
     </div>

     </div>
     </div>
  )
}
