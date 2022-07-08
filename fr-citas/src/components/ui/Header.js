import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <NavLink className="navbar-brand" to="/">Citas</NavLink>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link " activeClassName = "active" exact aria-current="page" >Inicio</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link "  activeClassName = "active"  exact aria-current="page" >Usuario</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link "  activeClassName = "active"  exact aria-current="page">Médicos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link "  activeClassName = "active"  exact aria-current="page" >Administradores</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link "  activeClassName = "active"  exact aria-current="page">Salir</NavLink>
                </li>

          </ul>
    
    </div>
  </div>
</nav>
  )
}