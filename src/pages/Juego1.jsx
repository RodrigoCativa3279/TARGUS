import './Juego1.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import tituloImg from '../assets/Titulo.png';
import menuHamb from '../assets/menuHamb.png';
import iconocuenta from '../assets/iconocuenta.png';


function Juego1() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="d-flex align-items-center col-10">
          <Link to="/">
            <img src={tituloImg} className="logo"/>
          </Link>        
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
          <li><Link to="/editCuenta" className="botonesMenu">&lt;  Editar cuenta</Link></li>
          <li><Link to="/misiones" className="botonesMenu">&lt;  Misiones</Link></li>
          <li><Link to="/forocomunidad" className="botonesMenu">&lt;  Foro de la comunidad</Link></li>
          <li><Link to="/pagconfig" className="botonesMenu">&lt;  Configuración</Link></li>
        </ul>

      {/*JUEGO A IMPLEMENTAR*/}

      </div>
    </div>
  );
}

export default Juego1;