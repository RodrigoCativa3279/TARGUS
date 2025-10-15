import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

import tituloImg from "../../assets/Titulo.png";
import menuHamb from "../../assets/menuHamb.png";
import iconocuenta from "../../assets/iconocuenta.png";

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    return (
        <>
            {/* INICIO NAVBAR */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="d-flex align-items-center col-10">
                    <Link to="/">
                        <img src={tituloImg} className="logo" alt="Logo principal" />
                    </Link>
                </div>

                <button className="navbar-toggler col-2" type="button" aria-expanded={menuAbierto} onClick={toggleMenu}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="col-2 text-right">
                    <img src={menuHamb} className="menuHamb img-fluid" alt="Menú" style={{ cursor: "pointer" }} onClick={toggleMenu} />
                </div>
            </nav>

            {/* MENÚ LATERAL */}
            <div className={`menu-lateral ${menuAbierto ? "abierto" : ""}`}>
                <button className="cerrar-menu" onClick={toggleMenu}>
                    ×
                </button>

                <div className="usuario">
                    <div className="nombre">JuanPedro001</div>
                    <img className="iconocuenta img-fluid" src={iconocuenta} alt="Usuario" />
                </div>

                <ul className="menu-opciones">
                    <li>
                        <Link to="/editCuenta" className="botonesMenu" onClick={toggleMenu}>
                            &lt; Editar cuenta
                        </Link>
                    </li>
                    <li>
                        <Link to="/misiones" className="botonesMenu" onClick={toggleMenu}>
                            &lt; Misiones
                        </Link>
                    </li>
                    <li>
                        <Link to="/forocomunidad" className="botonesMenu" onClick={toggleMenu}>
                            &lt; Foro de la comunidad
                        </Link>
                    </li>
                    <li>
                        <Link to="/pagconfig" className="botonesMenu" onClick={toggleMenu}>
                            &lt; Configuración
                        </Link>
                    </li>
                </ul>
            </div>
            {/* FINAL NAVBAR */}
        </>
    );
};

export default Navbar;
