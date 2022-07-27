import React, { useEffect } from 'react';
import {useState} from 'react';
import '../../assets/css/StyleModal.css';
import '../../assets/css/StyleForm.css';
import Swal from 'sweetalert2';
import {getUserByDoc, getMedicsByConsulta} from '../../services/usuarios/serviciosUsuarios';
import {getConsultas, getConsultaById} from '../../services/consultas/serviciosConsultas';
import {getDescuentosActivos, getDescuentoById} from '../../services/descuentos/serviciosDescuentos';
import {crearCita} from '../../services/citas/serviciosCitas';


export const CitaCreation = ({handleCloseModal}) => {

  const [numeroDoc, setNumeroDoc] = useState('');
  const [usuario, setUsuario] = useState([]);
  const [arregloConsultas, setArregloConsultas] = useState([]);
  const [idConsulta, setIdConsulta] = useState('');
  const [consulta, setConsulta] = useState([]);
  const[arregloMedicos, setArregloMedicos] = useState([]);
  const[idMedico, setIdMedico] = useState('');
  const[medico, setMedico] = useState([]);
  const [arregloDescuentos, setArregloDescuentos] = useState([]);
  const [idDescuento, setIdDescuento] = useState('');
  const [descuentoMotivo, setDescuentoMotivo] = useState([]);
  const [fecha, setFecha] = useState([]);
  const [hora, setHora] = useState([]);
  const [fechaCita, setFechaCita] = useState([]);


  const handleInputChange = ({ target })=> {
    const {name, value} = target;
    
    if(name === 'numeroDoc'){
      setNumeroDoc(value);
    }else if (name === 'fecha'){
      setFecha(value);
    }else if (name === 'hora'){
      setHora(value);
    }else if (name === 'consulta'){
      setIdConsulta(value);
    }else if (name === 'medico'){
      setIdMedico(value);
    }else if (name === 'descuento'){
      setIdDescuento(value);
    }
    setFechaCita(fecha+'T'+hora);
  }


  const getUsuario = async ()=>{
    try{
        Swal.showLoading();
        const {data} = await getUserByDoc(numeroDoc);
        setUsuario(data);
        Swal.close();
        Swal.fire(
          'Usuario encontrado:',
          data.nombres+" "+data.apellidos,
          'success'
          );
      } catch (error){
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Usuario no encontrado',
          text: 'No se encontro el documento: '+numeroDoc
        });
        
    }
  }


 

  const getMedico = async ()=>{
    try{
        const {data} = await getUserByDoc(idMedico);
        setMedico(data);
        
      } catch (error){
        console.log(error);
        
    }
  }

  useEffect(()=>{
    getMedico();

  }, [idMedico]);


  const getConsulta = async ()=>{
    try{
        const {data} = await getConsultaById(idConsulta);
        setConsulta(data);
        
      } catch (error){
        console.log(error);
        
    }
  }

  useEffect(()=>{
    getConsulta();
  }, [idConsulta]);


  const getDescuento = async ()=>{
    try{
        const {data} = await getDescuentoById(idDescuento);
        setDescuentoMotivo(data);
        
      } catch (error){
        console.log(error);
        
    }
  }

  useEffect(()=>{
    getDescuento();
  }, [idDescuento]);


const listarConsultas = async () =>{
    try{
      const {data} = await getConsultas();
      setArregloConsultas(data);
    }catch(error){
      console.log(error);
    }
}

useEffect(()=>{
  listarConsultas();
}, []);


const listarMedicos = async () =>{
  try{
    const {data} = await getMedicsByConsulta(idConsulta);
    setArregloMedicos(data);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  listarMedicos();
}, [ idConsulta]);




const listarDescuentos = async () => {
  try{
    const {data} = await getDescuentosActivos();
    setArregloDescuentos(data);
  }catch(error){
    console.log(error);
  }
}

useEffect(()=>{
  listarDescuentos();
}, []);


const guardarCita = async (e)=> {
  e.preventDefault();
  const cita = {
    fechaCita, usuario, medico, consulta, descuentoMotivo
  }
      try{
        Swal.fire({
          allowOutsideClick: false,
          text: 'Cargando...'
        });
        Swal.showLoading();
        await crearCita(cita);
        Swal.close();
        Swal.fire(
          'Cita creada con éxito',
          'Consulta: '+consulta.especialidad.nombre+'. Médico: '+medico.nombres+' '+medico.apellidos+'. Fecha: '+fecha+'. Hora: '+hora+'.',
          'success' 
          );
      e.target.reset();
    }catch(error){
      Swal.close();
      let msj;
      console.log(error);
      if(error && error.response && error.response.data && error.response.data.message){
          msj = error.response.data.message;
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
                            <h3>Crear cita</h3>
                            <i className="fa-solid fa-xmark style-icon" id={`cerrar-vent-crear`} onClick={handleCloseModal}></i>
                          </div>
                          <hr/>

                          <p id="description">Por favor ingresa los datos de la cita que quieres crear:</p>
                        </div>
                  </div>


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
                                                            <option value="">Selecciona la hora</option>
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

/*
https://blog.hubspot.com/website/html-form-template
https://codepen.io/hubspot/pen/MWQPopX




-usuario

-fecha cita

-consulta
-médico

-estadoAtencion
-estadoPago
-descuentoMotivo
*/