// editCuenta.jsx
import "./editCuenta.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";

/* ---------- listas de imágenes para el avatar ---------- */
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

const caras = [cara0, cara1, cara2, cara3, cara4];
const sombreros = [sombrero0, sombrero1, sombrero2, sombrero3, sombrero4];

function EditCuenta() {
    /* ---------- Estados generales ---------- */
    const [customizadorAbierto, setCustomizador] = useState(false);

    /* ---------- Estados del avatar ---------- */
    const [cara, setCara] = useState(0);
    const [sombrero, setSombrero] = useState(0);

    /* ---------- Persistencia en localStorage ---------- */
    useEffect(() => {
        const guardado = JSON.parse(localStorage.getItem("avatarTargus")) || {};
        if (guardado.cara !== undefined) setCara(guardado.cara);
        if (guardado.sombrero !== undefined) setSombrero(guardado.sombrero);
    }, []);

    useEffect(() => {
        localStorage.setItem("avatarTargus", JSON.stringify({ cara, sombrero }));
    }, [cara, sombrero]);

    /* ---------- Helpers ---------- */
    const toggleCustomizador = () => setCustomizador(!customizadorAbierto);

    return (
        <div>
            <Navbar />
            {/* ---------- SECCIÓN PRINCIPAL ---------- */}
            <div className="background">
                <div className="principal">
                    <div className="avatar-wrapper">
                        <div className="avatar-container">
                            {/* Cara */}
                            <img src={caras[cara]} className="avatar-layer avatar-face" alt="Cara" />
                            {/* Sombrero */}
                            <img src={sombreros[sombrero]} className="avatar-layer avatar-hat" alt="Sombrero" />
                        </div>

                        <button className="btn-personalizar" onClick={toggleCustomizador}>
                            Personalizar avatar
                        </button>
                    </div>

                    {/* INFO DEL USUARIO */}
                    <div className="datos">
                        <p>Correo electrónico</p>
                        <p className="text-info">Juan123@gmail.com</p>
                        <p>Fecha de creación de cuenta</p>
                        <p className="text-info">12/12/2025</p>
                    </div>
                </div>
            </div>

            {/* ---------- CUSTOMIZADOR (Modal simple) ---------- */}
            {customizadorAbierto && (
                <div className="customizador-overlay" onClick={toggleCustomizador}>
                    <div className="customizador" onClick={(e) => e.stopPropagation()}>
                        <h2>Cara</h2>
                        <div className="opciones">
                            {caras.map((img, i) => (
                                <img key={i} src={img} className={i === cara ? "selected" : ""} onClick={() => setCara(i)} />
                            ))}
                        </div>

                        <h2>Sombrero</h2>
                        <div className="opciones">
                            {sombreros.map((img, i) => (
                                <img key={i} src={img} className={i === sombrero ? "selected" : ""} onClick={() => setSombrero(i)} />
                            ))}
                        </div>

                        <button className="btn-cerrar" onClick={toggleCustomizador}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditCuenta;
