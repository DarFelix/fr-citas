import React from 'react';
import '../../assets/css/StyleModal.css';

export const CitaCreation = ({handleModal}) => {
  return (
    <div className='modal-style'>

     <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='modal-style-header'>
            <h3>Crear cita</h3>
            <i className="fa-solid fa-xmark" onClick={handleModal}></i>
          </div>
          <hr/>
        </div>

      </div>

     </div>

    </div>
  )
}
