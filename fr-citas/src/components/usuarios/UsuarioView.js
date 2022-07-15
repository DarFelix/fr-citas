import React from 'react'

export const UsuarioView = () => {
  return (
    <div className="row">

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Creación de usuario</h2>
              <p id="parrafo-card">Creación de usuario en el sistema con permisos de acuerdo al rol.</p>
              <div className="cta-container transition-esp"><a href="#" className="cta">Crear</a></div>
              <div className="card-esp_circle_add_user transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Edición de usuario</h2>
              <p id="parrafo-card">Edición de información de un usuario en el sistema</p>
              <div className="cta-container transition-esp"><a href="#" className="cta">Editar usuario</a></div>
              <div className="card-esp_circle_edit_user transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Búsqueda de usuario</h2>
              <p id="parrafo-card">Búsqueda de un usuario de acuerdo a un criterio seleccionado.</p>
              <div className="cta-container transition-esp"><a href="#" className="cta">Buscar usuario</a></div>
              <div className="card-esp_circle_search transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Listar usuarios</h2>
              <p id="parrafo-card">Listado de todas las usuarios. Se pueden ordenar por uno de los criterios seleccionados.</p>
              <div className="cta-container transition-esp"><a href="#" className="cta">Listar</a></div>
              <div className="card-esp_circle_list transition-esp"></div>
          </div>

          <div className="card-esp transition-esp">
              <h2 className="transition-esp" >Búsqueda de usuario por id</h2>
              <p id="parrafo-card">Búsqueda de un usuario específico en el sistema según su id en la base de datos.</p>
              <div className="cta-container transition-esp"><a href="#" className="cta">Buscar por id</a></div>
              <div className="card-esp_circle_search_u transition-esp"></div>
          </div>

          
  </div>
  )
}
