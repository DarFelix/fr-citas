import React from 'react';

const logout = () => {
  window.location.href = '/';
  localStorage.clear();
}

export const InicioView = () => {

  return (
    <div>
      <button  type="button" className="btn btn-success" onClick={logout}>
        Salir
      </button>

    </div>
  )
}
