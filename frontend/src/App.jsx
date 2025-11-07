import React, { useEffect, useState } from "react";
import { useNavigate, Link, Route, Routes } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar/Navbar";
import juego1 from "./assets/Juego 1.png";
import juego2 from "./assets/Juego 2.png";
import juego3 from "./assets/Juego 3.png";
import juego4 from "./assets/Juego 4.png";
import juego5 from "./assets/Juego 5.png";
import juego6 from "./assets/Juego 6.png";

import Initial from "./pages/higherorlower/Initial";
import Game from "./pages/higherorlower/Game";
import Lose from "./pages/higherorlower/Lose";
import { useVideos } from "./hooks/useVideos";

function App() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(0);
  const [score, setScore] = useState(0);
  const { videos, loading, error } = useVideos();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, [navigate]);

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <main className="principal">
              <section className="destacados" aria-labelledby="clasicos-title">
                <h1 id="clasicos-title" className="categoria">Clásicos</h1>
                <div className="grid-juegos">
                  <Link to="/crucigrama" className="juego enlace-juego">
                    <figure>
                      <img src={juego1} alt="Vista previa del juego Crucigrama" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">Crucigrama</h2>
                        <p className="descripcion">¡Desafía tu mente y divertite completando el crucigrama!</p>
                      </figcaption>
                    </figure>
                  </Link>

                  <Link to="/sudoku" className="juego enlace-juego">
                    <figure>
                      <img src={juego2} alt="Vista previa del juego Sudoku" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">Sudoku</h2>
                        <p className="descripcion">Entrená tu lógica y resolución con desafíos diarios.</p>
                      </figcaption>
                    </figure>
                  </Link>

                  <Link to="/sopaDeLetras" className="juego enlace-juego">
                    <figure>
                      <img src={juego3} alt="Vista previa del juego Sopa de Letras" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">Sopa de letras</h2>
                        <p className="descripcion">Encontrá las palabras ocultas y mejorá tu atención visual.</p>
                      </figcaption>
                    </figure>
                  </Link>
                </div>
              </section>

              <section className="destacados" aria-labelledby="nuevos-title">
                <h1 id="nuevos-title" className="categoria">Nuevos</h1>
                <div className="grid-juegos">
                  <Link to="/wordle" className="juego enlace-juego">
                    <figure>
                      <img src={juego4} alt="Vista previa del juego Wordle" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">Adivina la palabra</h2>
                        <p className="descripcion">Descubrí la palabra secreta antes de quedarte sin intentos.</p>
                      </figcaption>
                    </figure>
                  </Link>

                  <Link to="/higherorlower" className="juego enlace-juego">
                    <figure>
                      <img src={juego5} alt="Vista previa del juego Mayor o Menor" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">¿Mayor o menor?</h2>
                        <p className="descripcion">Probá tu intuición comparando datos y estadísticas.</p>
                      </figcaption>
                    </figure>
                  </Link>

                  <Link to="/AdivinaPais" className="juego enlace-juego">
                    <figure>
                      <img src={juego6} alt="Vista previa del juego Adivina el país" loading="lazy" />
                      <figcaption>
                        <h2 className="tituloJuego">Adivina el país</h2>
                        <p className="descripcion">¿Podés reconocer cada país con solo su bandera? ¡Demostrá tu conocimiento!</p>
                      </figcaption>
                    </figure>
                  </Link>
                </div>
              </section>
            </main>
          }
        />

        <Route path="/higherorlower/*" element={<Initial setPages={setPages} />} />
        <Route
          path="/higherorlower/Game.jsx"
          element={
            error || !videos || videos.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: "30px" }}>
                No se pudieron cargar los videos. No se puede jugar a "Mayor o Menor".
              </div>
            ) : (
              <Game key={score} videos={videos} score={score} setScore={setScore} setPages={setPages} />
            )
          }
        />
        <Route
          path="/higherorlower/lose"
          element={<Lose score={score} setPages={setPages} setScore={setScore} />}
        />
      </Routes>
    </>
  );
}

export default App;
