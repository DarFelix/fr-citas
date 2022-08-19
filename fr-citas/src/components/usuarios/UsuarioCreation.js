import React, { useState, useEffect } from 'react';
import '../../assets/css/StyleModal.css';
import '../../assets/css/StyleForm.css';
import {getRoles, crearUsuario} from '../../services/usuarios/serviciosUsuarios';
import {getEspecialidades} from '../../services/especialidades/serviciosEspecs';
import Swal from 'sweetalert2'; 

export const UsuarioCreation = ({handleCloseModal}) => {

  const [hideSpa, setHideSpa] = useState(false);
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [valoresForm, setValoresForm] = useState({});
  const {tipoDoc='', numeroDoc='', nombres='', apellidos='', fechaNacimiento= '', telefono='',
  correo='', pass='', rol, especialidad} = valoresForm;

  const handleOnChange = ({ target }) => {
    const {name, value} = target;
    setValoresForm({...valoresForm, [name]: value});
    if (name === 'rol' && value === 'MEDIC'){
      setHideSpa(true);
    }else if(name !== 'especialidad'){
      setHideSpa(false);
    }
  }


  const listarRoles = async () => {
    try{
      const {data} = await getRoles();
      setRoles(data);
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
    }catch (error){ 
      console.log(error);
    }
  }

  useEffect(()=>{
   listarEspecs();
  },[]);

 


  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const medico = {
      tipoDoc,numeroDoc, nombres, apellidos, fechaNacimiento, telefono,
      correo, pass, 
      rol: {
        idRol: rol
      },
      especialidad: {
        idEspecialidad: especialidad
      }
    }

    const usuario = {
      tipoDoc,numeroDoc, nombres, apellidos, fechaNacimiento, telefono,
      correo, pass, 
      rol: {
        idRol: rol
      }
    }
    
    let user;

    if(especialidad !== undefined){
      user = medico;
    }else{
      user = usuario;
    }

    console.log(user);
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
      });
      Swal.showLoading();
      await crearUsuario(user);
      Swal.close();
      Swal.fire(
        'Usuario creado con éxito',
        'Se ha ingresado a '+usuario.nombres+' '+usuario.apellidos+' en el sistema.',
        'success' 
        );
    e.target.reset();

        setValoresForm({tipoDoc:'', numeroDoc:'', nombres:'', apellidos:'', fechaNacimiento:'', telefono:'',
        correo:'', pass:'', rol: undefined, especialidad: undefined});

    }catch(error){
      Swal.close();
      let msj;
      if(error && error.response && error.response.data && error.response.data.error){
          msj = error.response.data.error;
      } else {
          msj = 'Ocurrio un error, por favor verifique';
      }
      Swal.fire('Error', msj ,'error');  
      e.target.reset();
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
                    <form onSubmit={(e) => handleOnSubmit(e)}>  
                        
                     
                    <fieldset>

                            <div className="account-details">
                                <div><label>Tipo de documento:</label>
                                
                                                                <select className="form-select" 
                                                                  required
                                                                  minLength={3}
                                                                  name='tipoDoc'
                                                                  value={tipoDoc}
                                                                  onChange={ (e) => handleOnChange(e)}
                                                                  >
                                                                    <option value="">Escoge el tipo de documento</option>
                                                                    <option value="CC">CC</option>
                                                                    <option value="PP">PP</option>
                                                                    <option value="CE">CE</option>
                                                                  </select>
                                                                          
                                                                          
                                </div>
                            </div>
                           
                     
                            

                            <div className="account-details">
                                     <div><label>Número de documento:</label>
                                                          <input type="number"  
                                                            required
                                                            minLength={3}
                                                              name='numeroDoc'
                                                              value={numeroDoc}
                                                              onChange={ (e) => handleOnChange(e)}
                                                             />
                                    </div>
                            </div>

                            

                            <div className="account-details">
                                      <div><label>Nombres:</label>
                                                                <input type="text"  name="nombres"  
                                                                  required
                                                                  minLength={3}
                                                                  value={nombres}
                                                                  id ='inp-form'
                                                                  onChange={ (e) => handleOnChange(e)}
                                                                  />                        
                                      </div>
                            </div>

                            <div className="account-details">
                                      <div><label>Apellidos:</label>
                                                                <input type="text"  name="apellidos"  
                                                                  required
                                                                  minLength={3}
                                                                  value={apellidos}
                                                                  id ='inp-form'
                                                                  onChange={ (e) => handleOnChange(e)}
                                                                  />                        
                                      </div>
                            </div>

                            

                            <div className="account-details">
                                <div><label>Fecha de nacimiento: </label>
                                                              <input type="date"  name="fechaNacimiento" 
                                                              onChange={ (e) => handleOnChange(e)}
                                                              required
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Teléfono: </label>
                                                              <input type="number"  name="telefono"  
                                                              required
                                                              value={telefono}
                                                              onChange={ (e) => handleOnChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Email: </label>
                                                              <input type="email"  name="correo"  
                                                              required
                                                              value={correo}
                                                              onChange={ (e) => handleOnChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Contraseña: </label>
                                                              <input type="password"  name="pass"  
                                                              required
                                                              value={pass}
                                                              id ='inp-form'
                                                              onChange={ (e) => handleOnChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Rol: </label>
                                                            <select className="form-select"
                                                              required
                                                              name='rol'
                                                              value={rol}
                                                              onChange={ (e) => handleOnChange(e)}>
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  roles.map(({idRol, nombre})=> {
                                                                      return <option key={idRol} value={idRol}>{nombre}</option>
                                                                  })
                                                                  }
                                                            </select>         
                                </div>
                            </div>

                          {hideSpa === true &&
                            <div className="account-details">
                                <div><label>Especialidad: </label>
                                                            <select className="form-select"
                                                              name='especialidad'
                                                              value={especialidad}
                                                              onChange={ (e) => handleOnChange(e)}>
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  especialidades.map(({idEspecialidad, nombre})=> {
                                                                      return <option key={idEspecialidad} value={idEspecialidad}>{nombre}</option>
                                                                  })
                                                                  }
                                                            </select>           
                                </div>
                            </div>

                            }

                            <div className="container-btn-crear">
                              <button id='btn-crear-cita'>Crear usuario</button>
                            </div>
                            
                           </fieldset>

                        </form>


                        
                    </div> 

     </div> 
     </div>
  )
}
