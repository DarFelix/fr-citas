import React, {useState} from 'react'
import '../../assets/css/Login.css';
import {crearAuth} from '../../services/AuthService';
import Swal from 'sweetalert2';


const Login = () => {

  const [valoresForm, setValoresForm] = useState({});
  const {correo='', password=''} = valoresForm;

  const [aviso, setAviso] = useState({});
  const {error= false, errorMsg= ""} = aviso;
  

  const manejadorSubmit = async (e) =>{
    e.preventDefault();
    console.log(correo, password);
    try{
      Swal.fire({
        allowOutsideClick: false,
        text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await crearAuth(correo, password);
        localStorage.setItem("token", data.access_token);
        console.log(data.access_token);
        Swal.close();
    }catch(error){
      setAviso({error: true, errorMsg: error.message});
      Swal.close();
    }
  }


  /*
  const manejadorSubmit = async (e) =>{
    e.preventDefault();
    console.log(correo, password);
    try{
      const { data } = await crearAuth(correo, password);
      console.log(data.status);

    }catch(error){
      let msj;
      if(error && error.response && error.response.data && error.response.data.error){
          msj = error.response.data.error;
      } else {
          msj = 'Ocurrio un error, por favor verifique';
      }
    }
  }
  */

  const manejadorChange = ({ target }) => {
    const {name, value} = target;
    setValoresForm({...valoresForm, [name]: value});
  }

 
  return (
    <>
        <div className="wrapper fadeInDown">
            <div id="formContent">
              
                <div className="fadeIn first">
                  <br/><br/>
                <img src="https://img.freepik.com/vector-gratis/icono-salud-corazon-hoja-verde-clinica-cirugia-cardiaca-centro-cardiologia-o-practica-medico-cardiologo-emblema-vector-programa-medico-etiqueta-o-icono-silueta-corazon-rojo-hojas_8071-8544.jpg?w=2000" id="icon" alt="User Icon" />
                  <br/><br/>
                </div>

                
                <form onSubmit={(e) => manejadorSubmit(e)}>
                <input type="text"  className="fadeIn second" name="correo" placeholder="Usuario" onChange={manejadorChange}/>
                <input type="password"  className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange}/>
                <input type="submit" className="fadeIn fourth" value="Ingresar"/>
                </form>

                
                <div id="formFooter">
                <a className="underlineHover" href="#">Olvidaste la contraseña?</a>
                </div>

                {
                error === true &&
                    <div className="alert alert-danger" role="alert">
                      {errorMsg}
                    </div>
                }

            </div>
        </div>
    </>
  )
}

export {
    Login
}
