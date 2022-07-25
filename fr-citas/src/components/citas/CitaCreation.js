import React from 'react';
import {useState} from 'react';
import '../../assets/css/StyleModal.css';
import '../../assets/css/StyleForm.css';
import Swal from 'sweetalert2';
import {getUserByDoc} from '../../services/usuarios/serviciosUsuarios';


export const CitaCreation = ({handleCloseModal}) => {

  const [numeroDoc, setNumeroDoc] = useState('');
  const [usuario, setUsuario] = useState([]);


  const handleInputChange = ({ target })=> {
    const {name, value} = target;
    setNumeroDoc(value);
    
  }

  const getUsuario = async ()=>{
    try{
        Swal.showLoading();
        const {data} = await getUserByDoc(numeroDoc);
        setUsuario(data);
        console.log(data);
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
                    <form action="/">
                        
                        <fieldset>
                            <legend>
                            <h5>Usuario</h5>
                            </legend>

                            <div className="account-details">
                                <div><label>Número de documento*</label><input 
                                                                          type="number" 
                                                                          onChange={(e) => handleInputChange(e)}
                                                                          name="numeroDoc"
                                                                          required/></div>
                                <div><button  onClick={getUsuario}>Consultar</button></div>
                            </div>
                           
                        </fieldset>

                        <fieldset>
                            <legend>
                            <h5>Cita</h5>
                            </legend>

                            <div className="account-details">
                              <div><label>Fecha de cita</label><input  type="date" name="name" required/></div>
                            </div>

                            <div className="account-details">
                              <div><label>Consulta</label><input     required/></div>
                              <div><button>Consultar</button></div>
                            </div>

                            <div className="account-details">
                              <div><label>Médico</label><input  required/></div>
                            </div>

                            <div className="account-details">
                              <div><label>Descuento</label><input   required/></div>
                            </div>

                            <div className="account-details">
                              <button>Crear cita</button>
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