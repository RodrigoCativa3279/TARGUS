import React, { useState, useRef, useEffect } from "react";
import Celda from "./celda";
import datos from "./data.json";
import "./crucigrama.css";

export default function Crucigrama() {
  const dificultad = "dificil";
  const [tablero, setTablero] = useState([]);
  const [numeros, setNumeros] = useState([]);
  const [palabraActiva, setPalabraActiva] = useState({ coords: [], direccion: "" });
  const [mostrarSolucion, setMostrarSolucion] = useState(false);
  const [errores, setErrores] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const filas = datos[dificultad].filas;
    const columnas = datos[dificultad].columnas;

    const nuevoTablero = Array.from({ length: filas }, () =>
      Array.from({ length: columnas }, () => ({ letra: "", bloqueada: true }))
    );

    const numRefs = [];

    
    datos[dificultad].horizontales.forEach((p) => {
      for (let i = 0; i < p.palabra.length; i++) {
        if (p.y < filas && p.x + i < columnas) {
          nuevoTablero[p.y][p.x + i] = { letra: "", bloqueada: false };
        }
      }
      numRefs.push({ fila: p.y, col: p.x, numero: p.numero });
    });

    
    datos[dificultad].verticales.forEach((p) => {
      for (let i = 0; i < p.palabra.length; i++) {
        if (p.y + i < filas && p.x < columnas) {
          nuevoTablero[p.y + i][p.x] = { letra: "", bloqueada: false };
        }
      }
      numRefs.push({ fila: p.y, col: p.x, numero: p.numero });
    });

    refs.current = Array.from({ length: filas }, () =>
      Array.from({ length: columnas }, () => React.createRef())
    );

    setTablero(nuevoTablero);
    setNumeros(numRefs);
  }, []);

  const actualizarTablero = (fila, col, letra) => {
    const nuevo = tablero.map((f, fi) =>
      f.map((c, ci) => (fi === fila && ci === col ? { ...c, letra } : c))
    );
    setTablero(nuevo);
  };

  const indiceEnActiva = (fila, col) =>
    palabraActiva.coords.findIndex((c) => c.fila === fila && c.col === col);

  const moverFocusA = (fila, col) => {
    if (
      refs.current &&
      refs.current[fila] &&
      refs.current[fila][col] &&
      refs.current[fila][col].current
    ) {
      refs.current[fila][col].current.focus();
      try {
        refs.current[fila][col].current.select();
      } catch (e) {}
    }
  };

  const manejarCambio = (valor, fila, col) => {
    if (!/^[A-Za-z]?$/.test(valor)) return;
    const upper = valor.toUpperCase();
    actualizarTablero(fila, col, upper);

    const idx = indiceEnActiva(fila, col);
    if (idx === -1) return;

    if (upper !== "") {
      const siguienteIdx = idx + 1;
      if (siguienteIdx < palabraActiva.coords.length) {
        const siguiente = palabraActiva.coords[siguienteIdx];
        moverFocusA(siguiente.fila, siguiente.col);
      }
    }
  };

  const manejarKeyDown = (e, fila, col) => {
    const key = e.key;
    const idx = indiceEnActiva(fila, col);

    if (key === "Backspace") {
      e.preventDefault();
      const actual = tablero[fila][col].letra || "";
      if (actual !== "") {
        actualizarTablero(fila, col, "");
        return;
      }
      if (idx > 0) {
        const anterior = palabraActiva.coords[idx - 1];
        actualizarTablero(anterior.fila, anterior.col, "");
        moverFocusA(anterior.fila, anterior.col);
      }
      return;
    }

    if (key === "ArrowRight") {
      e.preventDefault();
      const nc = col + 1;
      if (nc < tablero[0].length && !tablero[fila][nc].bloqueada) moverFocusA(fila, nc);
      return;
    }
    if (key === "ArrowLeft") {
      e.preventDefault();
      const nc = col - 1;
      if (nc >= 0 && !tablero[fila][nc].bloqueada) moverFocusA(fila, nc);
      return;
    }
    if (key === "ArrowDown") {
      e.preventDefault();
      const nf = fila + 1;
      if (nf < tablero.length && !tablero[nf][col].bloqueada) moverFocusA(nf, col);
      return;
    }
    if (key === "ArrowUp") {
      e.preventDefault();
      const nf = fila - 1;
      if (nf >= 0 && !tablero[nf][col].bloqueada) moverFocusA(nf, col);
      return;
    }
  };

  const seleccionarPalabra = (fila, col) => {
    const palabrasHoriz = datos[dificultad].horizontales.filter(
      (p) => p.y === fila && col >= p.x && col < p.x + p.palabra.length
    );
    const palabrasVert = datos[dificultad].verticales.filter(
      (p) => p.x === col && fila >= p.y && fila < p.y + p.palabra.length
    );

    if (palabrasHoriz.length === 0 && palabrasVert.length === 0) return;

    let direccion = "horizontal";
    let palabra;

    if (palabrasHoriz.length && palabrasVert.length) {
      direccion = palabraActiva.direccion === "horizontal" ? "vertical" : "horizontal";
      palabra = direccion === "horizontal" ? palabrasHoriz[0] : palabrasVert[0];
    } else if (palabrasHoriz.length) {
      palabra = palabrasHoriz[0];
      direccion = "horizontal";
    } else {
      palabra = palabrasVert[0];
      direccion = "vertical";
    }

    const coords = [];
    for (let i = 0; i < palabra.palabra.length; i++) {
      if (direccion === "horizontal")
        coords.push({ fila: palabra.y, col: palabra.x + i });
      else coords.push({ fila: palabra.y + i, col: palabra.x });
    }

    setPalabraActiva({ coords, direccion });
    moverFocusA(fila, col);
  };

  const esCeldaActiva = (fila, col) => {
    return palabraActiva.coords.some((c) => c.fila === fila && c.col === col);
  };

  const obtenerNumero = (fila, col) => {
    const n = numeros.find((num) => num.fila === fila && num.col === col);
    return n ? n.numero : null;
  };

  const revelarTablero = () => {
    const nuevo = tablero.map((filaArr, fila) =>
      filaArr.map((celda, col) => {
        if (celda.bloqueada) return celda;

        
        const horiz = datos[dificultad].horizontales.find(
          (p) => p.y === fila && col >= p.x && col < p.x + p.palabra.length
        );

        
        const vert = datos[dificultad].verticales.find(
          (p) => p.x === col && fila >= p.y && fila < p.y + p.palabra.length
        );

        let letraCorrecta = "";
        if (horiz) letraCorrecta = horiz.palabra[col - horiz.x];
        else if (vert) letraCorrecta = vert.palabra[fila - vert.y];

        return { ...celda, letra: letraCorrecta.toUpperCase() };
      })
    );
    setTablero(nuevo);
    setMostrarSolucion(true);
    setErrores([]);
  };

  const verificarTablero = () => {
    const nuevosErrores = [];
    const nuevo = tablero.map((filaArr, fila) =>
      filaArr.map((celda, col) => {
        if (celda.bloqueada) return celda;

        const horiz = datos[dificultad].horizontales.find(
          (p) => p.y === fila && col >= p.x && col < p.x + p.palabra.length
        );
        const vert = datos[dificultad].verticales.find(
          (p) => p.x === col && fila >= p.y && fila < p.y + p.palabra.length
        );

        let letraCorrecta = "";
        if (horiz) letraCorrecta = horiz.palabra[col - horiz.x];
        else if (vert) letraCorrecta = vert.palabra[fila - vert.y];

        if (celda.letra.toUpperCase() !== letraCorrecta.toUpperCase()) {
          nuevosErrores.push({ fila, col });
        }

        return celda;
      })
    );
    setErrores(nuevosErrores);
  };

  const esError = (fila, col) => {
    return errores.some((e) => e.fila === fila && e.col === col);
  };

  return (
    <div className="crucigrama-contenedor">
      <div className="controles">
        <button onClick={revelarTablero}>Revelar tablero</button>
        <button onClick={verificarTablero}>Verificar</button>
      </div>

      <div className="tablero-contenedor">
        <div
          className="tablero"
          style={{
            gridTemplateColumns: `repeat(${datos[dificultad].columnas}, 40px)`,
            gridTemplateRows: `repeat(${datos[dificultad].filas}, 40px)`,
          }}
        >
          {tablero.map((filaArr, fila) =>
            filaArr.map((celda, col) => (
              <div
                key={`${fila}-${col}`}
                className={`celda-wrapper ${celda.bloqueada ? "bloqueada" : ""}`}
                onClick={() => seleccionarPalabra(fila, col)}
              >
                {obtenerNumero(fila, col) && (
                  <span className="numero-celda">{obtenerNumero(fila, col)}</span>
                )}
                <Celda
                  ref={refs.current[fila][col]}
                  value={celda.letra}
                  disabled={celda.bloqueada}
                  activa={esCeldaActiva(fila, col)}
                  onChange={(e) => manejarCambio(e.target.value, fila, col)}
                  onKeyDown={(e) => manejarKeyDown(e, fila, col)}
                  style={{ backgroundColor: esError(fila, col) ? "#e74c3c" : "" }}
                />
              </div>
            ))
          )}
        </div>

        <div className="pistas">
          <div className="horizontales">
            <h3>Horizontales</h3>
            <ul>
              {datos[dificultad].horizontales.map((p, i) => (
                <li key={i}>
                  <b>{p.numero}.</b> {p.pista}
                </li>
              ))}
            </ul>
          </div>
          <div className="verticales">
            <h3>Verticales</h3>
            <ul>
              {datos[dificultad].verticales.map((p, i) => (
                <li key={i}>
                  <b>{p.numero}.</b> {p.pista}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
