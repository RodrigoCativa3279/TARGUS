import './editCuenta.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import tituloImg from '../assets/Titulo.png';
import menuHamb from '../assets/menuHamb.png';
import iconocuenta from '../assets/iconocuenta.png';


function editCuenta() {
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
                <li><a href="#" className="botonesMenu">&lt;  Misiones</a></li>
                <li><a href="#" className="botonesMenu">&lt;  Foro de la comunidad</a></li>
                <li><a href="#" className="botonesMenu">&lt;  Configuración</a></li>
            </ul>
        </div>
        <div className="background">
            <div className="principal">
                <div>
                    <img src={iconocuenta} className="iconcuentaConfig rounded-circle img-fluid"/>
                    <h1 className="nomUser">Nombre de usuario</h1>
                </div>
                <div className="datos">
                    <p>Correo electrónico</p>
                    <p className="text-info">Juan123@gmail.com</p>
                    <p>Fecha de creación de cuenta</p>
                    <p className="text-info">12/12/2025</p>
                </div>
                <div className="estadistica">
                    <p>Ultimos resultados</p>
                </div>
            </div>
        </div>
      
    </div>
  );
}

export default editCuenta;