import React, {useState, useEffect} from 'react';
import '../../assets/css/StyleModal.css';
import '../../assets/css/StyleForm.css';
import {getRoles, getUserByDoc} from '../../services/usuarios/serviciosUsuarios';
import {getEspecialidades} from '../../services/especialidades/serviciosEspecs';


 
export const UsuarioEdition = ({handleCloseModal}) => {

  const [docu, setDocu] = useState('');
  const [primera, setPrimera] = useState(true);
  const [segunda, setSegunda] = useState(false);
  const [usuario, setUsuario] = useState();
  const [roles, setRoles] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [espec, setEspec] = useState();
  const [valoresForm, setValoresForm] = useState({});
  const {tipoDoc='', numeroDoc='', nombres='', apellidos='', fechaNacimiento= '', telefono='',
  correo='', rol, especialidad} = valoresForm;
 
  const handleInputChange = ({ target })=> {
    const {name, value} = target;
    if(name === 'docu'){
      setDocu(value);
    }
    setValoresForm({...valoresForm, [name]: value});
  } 

  const obtenerUsuario = async () => {
    try{
      const {data} = await getUserByDoc(docu);
      setUsuario(data);
      console.log(usuario);
      setPrimera(false);
      setSegunda(true);

      const esp = data.especialidad.idEspecialidad;
      console.log(esp);
      setEspec(esp);

    }catch (error){ 
      console.log(error);
    }
  }

  useEffect(()=>{   
    if(usuario !== undefined ){
    setValoresForm({
      tipoDoc: usuario.tipoDoc,
      numeroDoc: usuario.numeroDoc,
      nombres: usuario.nombres,
      apellidos: usuario.apellidos,
      fechaNacimiento: usuario.fechaNacimiento,
      telefono: usuario.telefono,
      correo: usuario.correo,
      rol: usuario.rol.idRol,
      especialidad: espec
   }
   ); 
  }
}, [usuario]);

  const regresar = () =>{
    setSegunda(false);
    setPrimera(true);
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
  },[])
 
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
  },[])

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

    {primera === true &&
     <div>

     <p id="description">Ingresa el número de documento del usuario que quieres editar</p>

      <div>
            <div className="account-details">
                <div><label>Número de documento: </label><input 
                                                          type="number" 
                                                          name="docu"
                                                          onChange={(e) => handleInputChange(e)}
                                                          required/></div>
                <div><button id='btn-buscar-usuario' onClick={obtenerUsuario}>Consultar</button></div>
            </div>
      </div>

      </div>
      }

            {segunda === true && 
                  <div className="main-block">
                    <form >  
                        
                     
                    <fieldset>

                            <div className="account-details">
                                <div><label>Tipo de documento:</label>
                                
                                                                <select className="form-select" 
                                                                  required
                                                                  minLength={3}
                                                                  name='tipoDoc'
                                                                  value={tipoDoc}
                                                                  onChange={(e) => handleInputChange(e)}
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
                                                              onChange={(e) => handleInputChange(e)}
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
                                                                  onChange={(e) => handleInputChange(e)}
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
                                                                  onChange={(e) => handleInputChange(e)}
                                                                  />                        
                                      </div>
                            </div>

                            

                            <div className="account-details">
                                <div><label>Fecha de nacimiento: </label>
                                                              <input type="date"  name="fechaNacimiento" 
                                                              required
                                                              value={fechaNacimiento}
                                                              onChange={(e) => handleInputChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Teléfono: </label>
                                                              <input type="number"  name="telefono"  
                                                              required
                                                              value={telefono}
                                                              onChange={(e) => handleInputChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Email: </label>
                                                              <input type="email"  name="correo"  
                                                              required
                                                              value={correo}
                                                              onChange={(e) => handleInputChange(e)}
                                                              />      
                                </div>
                            </div>

                            <div className="account-details">
                                <div><label>Rol: </label>
                                                            <select className="form-select"
                                                              required
                                                              name='rol'
                                                              value={rol}
                                                              onChange={(e) => handleInputChange(e)}
                                                              >
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  roles.map(({idRol, nombre})=> {
                                                                      return <option key={idRol} value={idRol}>{nombre}</option>
                                                                  })
                                                                  }
                                                            </select>         
                                </div>
                            </div>

                          
                            <div className="account-details">
                                <div><label>Especialidad: </label>
                                                            <select className="form-select"
                                                              required
                                                              name='especialidad'
                                                              value={especialidad}
                                                              onChange={(e) => handleInputChange(e)}
                                                              >
                                                                  <option value=''>--SELECCIONE--</option>
                                                                  {
                                                                  especialidades.map(({idEspecialidad, nombre})=> {
                                                                      return <option key={idEspecialidad} value={idEspecialidad}>{nombre}</option>
                                                                  })
                                                                  }
                                                            </select>           
                                </div>
                            </div>


                            <div className="modal-style-btn-horiz">
                              <button id='btn-crear-cita'>Actualizar usuario</button><button id='btn-crear-cita' onClick={regresar}>Regresar</button>
                            </div>
                            
                           </fieldset>

                        </form>


                        
                    </div> 
                }
     </div>
     </div>
  )
}
