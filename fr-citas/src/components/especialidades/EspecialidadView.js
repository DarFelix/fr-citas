import React from 'react'

export const EspecialidadView = () => {
  return (
    <div className="row">

    <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Crear especialidad</h2>
          <p id="parrafo-card">Creación de parámetro en el sistema para especialidad.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Crear</a></div>
          <div className="card-esp_circle_crear transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Listar especialidad</h2>
          <p id="parrafo-card">Listado de especialidades creadas en el sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Listar</a></div>
          <div className="card-esp_circle_list transition-esp"></div>
     </div>

     <div className="card-esp transition-esp">
          <h2 className="transition-esp" >Editar especialidad</h2>
          <p id="parrafo-card">Edición de una especialidad existente que permite actualizar información del sistema.</p>
          <div className="cta-container transition-esp"><a href="#" className="cta">Editar</a></div>
          <div className="card-esp_circle_edit transition-esp"></div>
     </div>
   
</div>
  )
}
