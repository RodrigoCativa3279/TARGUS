import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";

import juego1 from "./assets/Juego 1.png";
import juego2 from "./assets/Juego 2.png";
import juego3 from "./assets/Juego 3.png";
import juego4 from "./assets/Juego 4.png";
import juego5 from "./assets/Juego 5.png";
import juego6 from "./assets/Juego 6.png";
import Navbar from "./components/navbar/Navbar";

function App() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <Navbar />

            <div className="principal">
                <div className="destacados">
                    <h1 className="categoria">Clásicos</h1>
                    <div className="grid-juegos">
                        <Link to="/juego1" className="juego enlace-juego">
                            <img src={juego1} alt="Juego 1" />
                            <h4 className="tituloJuego">Crucigrama</h4>
                            <p className="descripcion">¡Desafía tu mente y divertite completando el crucigrama!</p>
                        </Link>

                        <a href="sudoku" className="juego enlace-juego">
                            <img src={juego2} alt="Juego 2" />
                            <h4 className="tituloJuego">Sudoku</h4>
                            <p className="descripcion">Entrená tu lógica y resolución con desafíos diarios.</p>
                        </a>
                        <a href="#" className="juego enlace-juego">
                            <img src={juego3} alt="Juego 3" />
                            <h4 className="tituloJuego">Sopa de letras</h4>
                            <p className="descripcion">Encontrá las palabras ocultas y mejorá tu atención visual.</p>
                        </a>
                    </div>
                </div>

                <div className="destacados">
                    <h1 className="categoria">Nuevos</h1>
                    <div className="grid-juegos">
                        <a href="wordle" className="juego enlace-juego">
                            <img src={juego4} alt="Juego 4" />
                            <h4 className="tituloJuego">Adivina la palabra</h4>
                            <p className="descripcion">Descubrí la palabra secreta antes de quedarte sin intentos.</p>
                        </a>
                        <a href="#" className="juego enlace-juego">
                            <img src={juego5} alt="Juego 5" />
                            <h4 className="tituloJuego">¿Mayor o menor?</h4>
                            <p className="descripcion">Probá tu intuición comparando datos y estadísticas.</p>
                        </a>
                        <a href="adivinaPais" className="juego enlace-juego">
                            <img src={juego6} alt="Juego 6" />
                            <h4 className="tituloJuego">Adivina el país</h4>
                            <p className="descripcion">¿Podés reconocer cada país con solo su bandera? ¡Demostrá tu conocimiento!</p>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
