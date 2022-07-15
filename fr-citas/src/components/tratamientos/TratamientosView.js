import React from 'react'

export const TratamientosView = () => {
  return (
    <div className="row">

    <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Crear tratamiento</h2>
          <p id="parrafo-card">Creación de parámetro en el sistema para tratamiento.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Crear</a></div>
          <div className="card-esp_circle_crear transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Listar tratamientos</h2>
          <p id="parrafo-card">Listado de tratamientos creados en el sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Listar</a></div>
          <div className="card-esp_circle_list transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Editar tratamiento</h2>
          <p id="parrafo-card">Edición de un tratamiento existente que permite actualizar información del sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Editar</a></div>
          <div className="card-esp_circle_edit transition-esp"></div>
     </div>
   
</div>
  )
}
