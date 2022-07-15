import React from 'react';
import slider1 from '../../images/slider1.png';
import '../../assets/css/Slider.css';


export const InicioView = () => {

  return (
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        
        <div className="carousel-inner">
          <div className="carousel-item active">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-4 offset-md-2">
                  <div className="slider_detail-box">
                    <h1>
                      Bienvenido usuario
                    </h1>
                    <p>
                      En esta página podrás realizar diferentes operaciones en el sistema
                      del centro médico de acuerdo a tu rol de usuario.
                      Si tienes inconvenientes puedes dejar un mensaje al personal de 
                      servicio técnico.
                    </p>
                    <div className="btn-box">
                      <a href="" className="btn-2">
                        Dejar mensaje
                      </a>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="slider_img-box">
                    <img src={slider1} alt="slid"/>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

        </div>
        
      </div>
  )
}
