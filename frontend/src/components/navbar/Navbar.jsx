import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import tituloImg from "../../assets/Titulo.png";
import menuHamb from "../../assets/menuHamb.png";
// Avatar assets
import cara0 from "../../assets/avatar/cara0.png";
import cara1 from "../../assets/avatar/cara1.png";
import cara2 from "../../assets/avatar/cara2.png";
import cara3 from "../../assets/avatar/cara3.png";
import cara4 from "../../assets/avatar/cara4.png";
import sombrero0 from "../../assets/avatar/sombrero0.png";
import sombrero1 from "../../assets/avatar/sombrero1.png";
import sombrero2 from "../../assets/avatar/sombrero2.png";
import sombrero3 from "../../assets/avatar/sombrero3.png";
import sombrero4 from "../../assets/avatar/sombrero4.png";

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [avatar, setAvatar] = useState({ cara: 0, sombrero: 0 });

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuAbierto((prev) => !prev);
        try {
            const su = localStorage.getItem("user");
            if (su) setUsuario(JSON.parse(su));
            const sa = localStorage.getItem("avatarTargus");
            if (sa) {
                const av = JSON.parse(sa);
                setAvatar({
                    cara: Number.isInteger(av.cara) ? av.cara : 0,
                    sombrero: Number.isInteger(av.sombrero) ? av.sombrero : 0,
                });
            }
        } catch (_) {}
    };

    useEffect(() => {
        if (menuAbierto) {
            document.body.classList.add("no-scroll");
        } else {
            document.body.classList.remove("no-scroll");
        }
        return () => document.body.classList.remove("no-scroll");
    }, [menuAbierto]);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUsuario(JSON.parse(storedUser));
        }
        const storedAvatar = localStorage.getItem("avatarTargus");
        if (storedAvatar) {
            try {
                const av = JSON.parse(storedAvatar);
                setAvatar({
                    cara: Number.isInteger(av.cara) ? av.cara : 0,
                    sombrero: Number.isInteger(av.sombrero) ? av.sombrero : 0,
                });
            } catch (_) {}
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
                    <div className="mini-avatar">
                        <img className="mini-avatar-layer mini-face" src={[cara0, cara1, cara2, cara3, cara4][avatar.cara]} alt="Avatar cara" />
                        <img className="mini-avatar-layer mini-hat" src={[sombrero0, sombrero1, sombrero2, sombrero3, sombrero4][avatar.sombrero]} alt="Avatar sombrero" />
                    </div>
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
                        <Link to="/" className="botonesMenu" onClick={handleLogout}>
                            &lt; Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;