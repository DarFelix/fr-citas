import React, {useState, useEffect} from 'react'
import '../assets/css/Login.css';





const Login = () => {

  
  state={
    form:{
      "usuario":"",
      "password":""
    },
    error: false,
    errorMsg:""
  }

  const manejadorSubmit = (e) =>{
    e.preventDefault();
  }

  manejadorChange = async (e) =>{
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name] : e.target.value
      }
    })
    console.log(this.state.form);
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
                <input type="text"  className="fadeIn second" name="usuario" placeholder="Usuario" onChange={manejadorChange}/>
                <input type="password"  className="fadeIn third" name="password" placeholder="Contraseña" onChange={manejadorChange}/>
                <input type="submit" className="fadeIn fourth" value="Ingresar"/>
                </form>

               
                <div id="formFooter">
                <a className="underlineHover" href="#">Olvidaste la contraseña?</a>
                </div>

            </div>
        </div>
    </>
  )
}

export {
    Login
}
