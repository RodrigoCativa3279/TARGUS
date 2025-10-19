import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import tituloImg from "../../assets/Titulo.png";
import menuHamb from "../../assets/menuHamb.png";
import iconocuenta from "../../assets/iconocuenta.png";

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    const toggleMenu = () => setMenuAbierto(!menuAbierto);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <>
            {/* NAVBAR SUPERIOR */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <div className="d-flex align-items-center col-10">
                    <Link to="/home">
                        <img src={tituloImg} className="logo" alt="Logo principal" />
                    </Link>
                </div>

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
                    <div className="nombre">{usuario ? usuario.username : "Invitado"}</div>
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
                    <li>
                        <Link to="#" className="botonesMenu" onClick={handleLogout}>
                            &lt; Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
