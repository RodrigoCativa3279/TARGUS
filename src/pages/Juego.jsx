import './Juego.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import tituloImg from '../assets/Titulo.png';
import menuHamb from '../assets/menuHamb.png';
import iconocuenta from '../assets/iconocuenta.png';


function Juego() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="d-flex align-items-center col-10">
          <img src={tituloImg} className="logo img-fluid" alt="Titulo" />
        </div>
        <button
          className="navbar-toggler col-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="col-2 text-right">
          <img
            src={menuHamb}
            className="menuHamb img-fluid"
            alt="Cuenta"
            style={{ cursor: 'pointer' }}
            onClick={toggleMenu}
          />
        </div>
      </nav>

      <div className={`menu-lateral ${menuAbierto ? 'abierto' : ''}`}>
        <button className="cerrar-menu" onClick={toggleMenu}>×</button>
        <div className="usuario">
          <div className="nombre">JuanPedro001</div>
          <img className="iconocuenta img-fluid" src={iconocuenta}/>
        </div>
        
        <ul>
          <li><a href="#">&lt;  Editar cuenta</a></li>
          <li><a href="#">&lt;  Misiones</a></li>
          <li><a href="#">&lt;  Foro de la comunidad</a></li>
          <li><a href="#">&lt;  Configuración</a></li>
        </ul>

      {/*JUEGO A IMPLEMENTAR*/}

      </div>
    </div>
  );
}

export default Juego;