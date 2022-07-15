import React from 'react'

export const ConsultasView = () => {
  return (
    <div className="row">

    <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Crear consulta</h2>
          <p id="parrafo-card">Creación de parámetro en el sistema para consulta.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Crear</a></div>
          <div className="card-esp_circle_crear transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Listar consulta</h2>
          <p id="parrafo-card">Listado de consultas creadas en el sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Listar</a></div>
          <div className="card-esp_circle_list transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Editar consulta</h2>
          <p id="parrafo-card">Edición de una consulta existente que permite actualizar información del sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Editar</a></div>
          <div className="card-esp_circle_edit transition-esp"></div>
     </div>
   
</div>
  )
}
