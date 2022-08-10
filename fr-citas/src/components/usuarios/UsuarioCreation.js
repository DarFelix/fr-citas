import React, { useState, useEffect } from 'react';
import '../../assets/css/StyleModal.css';
import '../../assets/css/StyleForm.css';
import {getRoles, crearUsuario} from '../../services/usuarios/serviciosUsuarios';
import {getEspecialidades} from '../../services/especialidades/serviciosEspecs';
import Swal from 'sweetalert2';

export const UsuarioCreation = ({handleCloseModal}) => {

  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const {tipoDoc='', numeroDoc='', nombres='', apellidos='', fechaNac= '', telefono='',
  email='', pass='', rol, especialidad} = valoresForm;

  const handleOnChange = ({ target }) => {
    const {name, value} = target;
    setValoresForm({...valoresForm, [name]: value});
  }

  const listarRoles = async () => {
    try{
      const {data} = await getRoles();
      setRoles(data);
      console.log(data);
    }catch (error){ 
      console.log(error);
    }
  }

  useEffect(()=>{
   listarRoles();
  },[]);

  const listarEspecs = async () => {
    try{
      const {data} = await getEspecialidades();
      setEspecialidades(data);
      console.log(data);
    }catch (error){ 
      console.log(error);
    }
  }

  useEffect(()=>{
   listarEspecs();
  },[]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const usuario = {
      tipoDoc,numeroDoc, nombres, apellidos, fechaNac, telefono,
      email, pass, 
      rol: {
        idRol: rol
      },
      especialidad: {
        idEspecialidad: especialidad
      }
    }
    console.log(usuario);
    try{
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await crearUsuario(usuario);
        console.log(data);
        Swal.close();
        handleOpenModal();
        listarUsuarios();
    }catch(error){
      Swal.close();
      let msj;
      if(error && error.response && error.response.data && error.response.data.error){
          msj = error.response.data.error;
      } else {
          msj = 'Ocurrio un error, por favor verifique';
      }
      Swal.fire('Error', msj ,'error');  
      
    }
  }


  return (
    <div className='modal-style'>
    <div className='container-fluid'>

     <div className='row'>
       <div className='col'>
         <div className='modal-style-header'>
           <h3>Crear usuario</h3>
           <i className="fa-solid fa-xmark style-icon" onClick={handleCloseModal} ></i>
         </div>
         <hr/>
       </div>
     </div>

     <p id="description">Por favor ingresa los datos del usuario a crear:</p>


                <div className="main-block">
                    <form onSubmit={(e) => guardarCita(e)}> 
                        
                        <fieldset>
                            

                            <div className="account-details">
                                <div><label>Número de documento*</label><input 
                                                                          type="number" 
                                                                          onChange={(e) => handleInputChange(e)}
                                                                          name="numeroDoc"
                                                                          required/></div>
                                <div><button id='btn-buscar-usuario' onClick={getUsuario}>Consultar</button></div>
                            </div>
                           
                        </fieldset>

                        <fieldset>
                            

                            <div className="account-details">
                                     <div><label>Fecha de cita</label>
                                                            <input  
                                                              type="date"
                                                             name="fecha" 
                                                             onChange={ (e) => handleInputChange(e)}
                                                             required/>
                                    </div>
                            </div>

                            <div className="account-details">
                                    <div><label>Hora de cita</label>
                                                        <select className="form-select" 
                                                          required 
                                                          name='hora'
                                                          onChange={ (e) => handleInputChange(e)}
                                                          >
                                                            <option value="">--SELECCIONE--</option>
                                                            <option value="06:00:00">06:00 AM</option>
                                                            <option value="06:20:00">06:20 AM</option>
                                                            <option value="06:40:00">06:40 AM</option>
                                                            <option value="07:00:00">07:00 AM</option>
                                                            <option value="07:20:00">07:20 AM</option>
                                                            <option value="07:40:00">07:40 AM</option>
                                                            <option value="08:00:00">08:00 AM</option>
                                                            <option value="08:20:00">08:20 AM</option>
                                                            <option value="08:40:00">08:40 AM</option>
                                                            <option value="09:00:00">09:00 AM</option>
                                                            <option value="09:20:00">09:20 AM</option>
                                                            <option value="09:40:00">09:40 AM</option>
                                                            <option value="10:00:00">10:00 AM</option>
                                                            <option value="10:20:00">10:20 AM</option>
                                                            <option value="10:40:00">10:40 AM</option>
                                                            <option value="11:00:00">11:00 AM</option>
                                                            <option value="11:20:00">11:20 AM</option>
                                                            <option value="11:40:00">11:40 AM</option>
                                                            <option value="12:00:00">12:00 PM</option>
                                                            <option value="12:20:00">12:20 PM</option>
                                                            <option value="12:40:00">12:40 PM</option>
                                                            <option value="13:00:00">01:00 PM</option>
                                                            <option value="13:20:00">01:20 PM</option>
                                                            <option value="13:40:00">01:40 PM</option>
                                                            <option value="14:00:00">02:00 PM</option>
                                                            <option value="14:20:00">02:20 PM</option>
                                                            <option value="14:40:00">02:40 PM</option>
                                                            <option value="15:00:00">03:00 PM</option>
                                                            <option value="15:20:00">03:20 PM</option>
                                                            <option value="15:40:00">03:40 PM</option>
                                                            <option value="16:00:00">04:00 PM</option>
                                                            <option value="16:20:00">04:20 PM</option>
                                                            <option value="16:40:00">04:40 PM</option>
                                                            <option value="17:00:00">05:00 PM</option>
                                                            <option value="17:20:00">05:20 PM</option>
                                                            <option value="17:40:00">05:40 PM</option>
                                                            <option value="18:00:00">06:00 PM</option>
                                                            <option value="18:20:00">06:20 PM</option>
                                                            <option value="18:40:00">06:40 PM</option>
                                                            <option value="19:00:00">07:00 PM</option>
                                                          </select>
                                  </div> 
                            </div>

                            <div className="account-details">
                                <div><label>Consulta</label>
                                                            <select className="form-select"
                                                              required
                                                              name='consulta'
                                                             
                                                              onChange={ (e) => handleInputChange(e)}>

                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  arregloConsultas.map((consult, index)=> {
                                                                      return <option key={index} value={consult.especialidad.idEspecialidad}>{consult.especialidad.nombre}</option>
                                                                  })
                                                                  }
                                                            </select>                           
                                </div>
                            </div>

                            <div className="account-details">
                              <div><label>Médico</label>
                                                            <select className="form-select"
                                                              required
                                                              name='medico'
                                                              onChange={ (e) => handleInputChange(e)}>
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  arregloMedicos.map((medic, index)=> {
                                                                      return <option key={index} value={medic.numeroDoc}>{medic.nombres+" "+medic.apellidos}</option>
                                                                  })
                                                                  }
                                                            </select>       
                              </div>
                            </div>

                            <div className="account-details">
                                <div><label>Descuento</label>
                                                            <select className="form-select"
                                                              required
                                                              name='descuento'
                                                              onChange={ (e) => handleInputChange(e)}>
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  arregloDescuentos.map((descuento, index)=> {
                                                                      return <option key={index} value={descuento.idDescuentoMotivo}>{descuento.porcentaje+" %"}</option>
                                                                  })
                                                                  }
                                                            </select>      
                                </div>
                            </div>


                            <div className="container-btn-crear">
                              <button id='btn-crear-cita'>Crear cita</button>
                            </div>
                            
                           
                            

                        </fieldset>
                        

                        </form>


                        
                    </div> 

     </div> 
     </div>
  )
}
