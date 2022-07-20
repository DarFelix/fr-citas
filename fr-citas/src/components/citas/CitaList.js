import React, { useState, useEffect } from 'react';
import '../../assets/css/StyleModal.css';
import {lista, listaPag} from '../../services/citas/serviciosCitas';
import '../../assets/css/StyleTable.css';

export const CitaList = ({handleCloseModal}) => {

const [citas, setCitas] = useState([]);
const [cit, setCit] = useState([]);

const listarCitas = async () => {
  try{
    const {data} = await listaPag();
    setCitas(data);

  }catch(error){
    console.log(error);
  }
}


const listarCit = async () => {
  try{
    const {data} = await lista();
    setCit(data);

  }catch(error){
    console.log(error);
  }
}

console.log(cit.length);



useEffect(()=> {
  listarCit();
  listarCitas();
}, []);




  return (
    <div className='modal-style'>

     <div className='container-fluid'>
      <div className='row'>
        <div className='col'>
          <div className='modal-style-header'>
            <h3>Listar citas</h3>
            <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
          </div>
          <hr/>
          <div className='table-wrapper'>
          <table className="table table-light table-striped "  >
              <thead>
                <tr>
                  <th scope="col">Cita ID</th>
                  <th scope="col">Fecha Cita</th>
                  <th scope="col">Nombre Paciente</th>
                  <th scope="col">Apellido Paciente</th>
                  <th scope="col">Nombre Médico</th>
                  <th scope="col">Apellido Médico</th>
                  <th scope="col">Correo Paciente</th>
                  <th scope="col">Estado Cita</th>
                </tr>
              </thead>
              <tbody>
                {
                citas.map((item) => (
                <tr key={item.idCita}>
                  
                <td>{item.idCita}</td>
                <td>{item.fechaCita}</td>
                <td>{item.usuario.nombres}</td>
                <td>{item.usuario.apellidos}</td>
                <td>{item.medico.nombres}</td>
                <td>{item.medico.apellidos}</td>
                <td>{item.usuario.correo}</td>
                <td>{item.estadoAtencion}</td>
              
                </tr>
                ))
                }
               
                
              </tbody>
            </table>

            </div>

            <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>
                    
                 
                      <li className="page-item"><a className="page-link" href="#">1</a></li>
                   
                    
                    <li className="page-item">
                      <a className="page-link" href="#">Next</a>
                    </li>
                  </ul>
            </nav>

        </div>

      </div>

     </div>

    </div>
  )
}