import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

import tituloImg from "../../assets/Titulo.png";
import menuHamb from "../../assets/menuHamb.png";
import cara0 from "../../assets/avatar/cara0.png";
import cara1 from "../../assets/avatar/cara1.png";
import cara2 from "../../assets/avatar/cara2.png";
import cara3 from "../../assets/avatar/cara3.png";
import cara4 from "../../assets/avatar/cara4.png";

const Navbar = () => {
    const [menuAbierto, setMenuAbierto] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [avatar, setAvatar] = useState({ cara: 0 });

    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuAbierto((prev) => !prev);
        try {
            const su = localStorage.getItem("user");
            if (su) setUsuario(JSON.parse(su));
            const sa = localStorage.getItem("avatarTargus");
            if (sa) {
                const av = JSON.parse(sa);
                setAvatar({ cara: Number.isInteger(av.cara) ? av.cara : 0 });
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
                const cara = parseInt(av.cara, 10);
                setAvatar({ cara: Number.isNaN(cara) ? 0 : cara });
            } catch (_) {}
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const faces = [cara0, cara1, cara2, cara3, cara4];
    const faceIdx = Number.isInteger(avatar.cara) && avatar.cara >= 0 && avatar.cara < faces.length ? avatar.cara : 0;
    const faceSrc = faces[faceIdx] || faces[0];

    return (
        <>
            {/* NAVBAR SUPERIOR */}
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/home" className="logo-link" aria-label="Ir a inicio">
                    <img src={tituloImg} className="logo" alt="Logo principal" />
                </Link>
                <div className="menu-right">
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
                        <img className="mini-avatar-layer mini-face" src={faceSrc} alt="Avatar cara" />
                    </div>
                </div>

                <ul className="menu-opciones">
                    <li>
                        <Link to="/editCuenta" className="botonesMenu" onClick={toggleMenu}>
                            Editar cuenta
                        </Link>
                    </li>
                    <li>
                        <Link to="/pagconfig" className="botonesMenu" onClick={toggleMenu}>
                            Configuración
                        </Link>
                    </li>
                    <li>
                        <Link to="/" className="botonesMenu" onClick={handleLogout}>
                            Cerrar sesión
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;