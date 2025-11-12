import { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar";
import nivelesData from "./niveles.json";
import "./Crucigrama.css";

export default function MiniCodyCross() {
  const niveles = nivelesData?.niveles || [];

  const [nivelActual, setNivelActual] = useState(0);
  const [puntaje, setPuntaje] = useState(0);
  const [palabrasUsuario, setPalabrasUsuario] = useState([]);
  const [palabraSeleccionada, setPalabraSeleccionada] = useState(null);
  const [mostrarPopup, setMostrarPopup] = useState("");
  const [nombreJugador, setNombreJugador] = useState("");
  const [finalizado, setFinalizado] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    if (niveles.length > 0 && niveles[nivelActual]) {
      const nivel = niveles[nivelActual];
      setPalabrasUsuario(nivel.palabras.map((p) => Array(p.length).fill("")));
      setPalabraSeleccionada(null);
    }
  }, [nivelActual, niveles.length]);

  function aMayuscula(letra) {
    return letra.toUpperCase();
  }

  function compararPalabrasArray(arr, palabra) {
    return arr.join("").toUpperCase() === palabra.toUpperCase();
  }

  function obtenerPalabraVertical(arrays) {
    let vertical = "";
    for (let arr of arrays) {
      if (arr && arr[2]) vertical += aMayuscula(arr[2]);
      else vertical += "_";
    }
    return vertical;
  }

  function gastarPuntos(costo) {
    if (puntaje < costo) {
      setMostrarPopup("No tienes puntos suficientes");
      setTimeout(() => setMostrarPopup(""), 1500);
      return false;
    }
    setPuntaje((p) => p - costo);
    return true;
  }

  function usarPistaLetra() {
    const costo = 10;
    if (palabraSeleccionada === null) {
      setMostrarPopup("Selecciona una palabra");
      setTimeout(() => setMostrarPopup(""), 1400);
      return;
    }
    if (!gastarPuntos(costo)) return;

    const nuevas = palabrasUsuario.map((a) => [...a]);
    const palabraCorrecta = niveles[nivelActual].palabras[palabraSeleccionada];
    const arrActual = nuevas[palabraSeleccionada];

    const indicesDisponibles = [];
    for (let i = 0; i < palabraCorrecta.length; i++) {
      const charActual = arrActual[i] || "";
      if (aMayuscula(charActual) !== aMayuscula(palabraCorrecta[i])) {
        indicesDisponibles.push(i);
      }
    }
    if (indicesDisponibles.length === 0) return;

    const randomIndex = indicesDisponibles[Math.floor(Math.random() * indicesDisponibles.length)];
    arrActual[randomIndex] = aMayuscula(palabraCorrecta[randomIndex]);

    nuevas[palabraSeleccionada] = arrActual;
    setPalabrasUsuario(nuevas);
    setFeedback(`-${costo}`);
    setTimeout(() => setFeedback(null), 700);
  }

  function usarPistaPalabra() {
    const costo = 25;
    if (palabraSeleccionada === null) {
      setMostrarPopup("Selecciona una palabra");
      setTimeout(() => setMostrarPopup(""), 1400);
      return;
    }
    if (!gastarPuntos(costo)) return;

    const nuevas = palabrasUsuario.map((a) => [...a]);
    const palabraCorrecta = niveles[nivelActual].palabras[palabraSeleccionada];
    nuevas[palabraSeleccionada] = palabraCorrecta.split("").map(aMayuscula);
    setPalabrasUsuario(nuevas);
    setFeedback(`-${costo}`);
    setTimeout(() => setFeedback(null), 700);
  }

  function usarPistaMultiple() {
    const costo = 30;
    if (!gastarPuntos(costo)) return;

    const nuevas = palabrasUsuario.map((a) => [...a]);
    const nivel = niveles[nivelActual];
    const posicionesDisponibles = [];
    for (let pi = 0; pi < nivel.palabras.length; pi++) {
      const pc = nivel.palabras[pi];
      for (let ci = 0; ci < pc.length; ci++) {
        const actual = nuevas[pi][ci] || "";
        if (aMayuscula(actual) !== aMayuscula(pc[ci])) {
          posicionesDisponibles.push([pi, ci]);
        }
      }
    }
    if (posicionesDisponibles.length === 0) return;

    const seleccionarN = Math.min(4, posicionesDisponibles.length);
    for (let i = posicionesDisponibles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [posicionesDisponibles[i], posicionesDisponibles[j]] = [posicionesDisponibles[j], posicionesDisponibles[i]];
    }
    const seleccionadas = posicionesDisponibles.slice(0, seleccionarN);
    seleccionadas.forEach(([pi, ci]) => {
      const letraCorrecta = niveles[nivelActual].palabras[pi][ci];
      nuevas[pi][ci] = aMayuscula(letraCorrecta);
    });

    setPalabrasUsuario(nuevas);
    setFeedback(`-${costo}`);
    setTimeout(() => setFeedback(null), 700);
  }

  function manejarLetra(e) {
    if (palabraSeleccionada === null) return;
    const tecla = e.key;
    const nuevas = palabrasUsuario.map((a) => [...a]);
    const palabraCorrecta = niveles[nivelActual].palabras[palabraSeleccionada];
    const arrActual = nuevas[palabraSeleccionada];

    if (tecla === "Backspace") {
      let last = -1;
      for (let i = arrActual.length - 1; i >= 0; i--) {
        if (arrActual[i]) {
          last = i;
          break;
        }
      }
      if (last >= 0) arrActual[last] = "";
      nuevas[palabraSeleccionada] = arrActual;
      setPalabrasUsuario(nuevas);
      return;
    }

    if (/^[a-zA-ZñÑ]$/.test(tecla)) {
      let idx = -1;
      for (let i = 0; i < arrActual.length; i++) {
        if (!arrActual[i]) {
          idx = i;
          break;
        }
      }
      if (idx === -1) return;

      arrActual[idx] = aMayuscula(tecla);
      nuevas[palabraSeleccionada] = arrActual;

      const completado = arrActual.join("").length === palabraCorrecta.length;
      if (completado && compararPalabrasArray(arrActual, palabraCorrecta)) {
        setPuntaje((p) => p + 10);
        setFeedback("+10");
        setTimeout(() => setFeedback(null), 700);
        setPalabraSeleccionada(null);
      } else if (completado && !compararPalabrasArray(arrActual, palabraCorrecta)) {
        nuevas[palabraSeleccionada] = Array(palabraCorrecta.length).fill("");
        setPalabrasUsuario(nuevas);
        setPuntaje((p) => Math.max(p - 5, 0));
        setFeedback("-5");
        setTimeout(() => setFeedback(null), 700);
        setMostrarPopup("¡Incorrecto! Intenta de nuevo.");
        setTimeout(() => setMostrarPopup(""), 1500);
      }
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", manejarLetra);
    return () => window.removeEventListener("keydown", manejarLetra);
  });

  if (!niveles.length || !niveles[nivelActual]) {
    return (
      <>
        <Navbar />
        <div className="mini-codycross">
          <h2>Cargando niveles...</h2>
        </div>
      </>
    );
  }

  const nivel = niveles[nivelActual];
  const completadas = nivel.palabras.map((p, i) => {
    const arr = palabrasUsuario[i] || Array(p.length).fill("");
    return compararPalabrasArray(arr, p);
  });
  const todasCompletadas = completadas.every((c) => c);

  useEffect(() => {
    if (todasCompletadas && nivelActual < niveles.length - 1) {
      const timer = setTimeout(() => setNivelActual((n) => n + 1), 900);
      return () => clearTimeout(timer);
    } else if (todasCompletadas && nivelActual === niveles.length - 1 && !finalizado) {
      setFinalizado(true);
    }
  }, [todasCompletadas, nivelActual, niveles.length, finalizado]);

  function guardarPuntaje() {
    if (!nombreJugador) return;
    const puntajes = JSON.parse(localStorage.getItem("puntajes")) || [];
    puntajes.push({ nombre: nombreJugador, puntaje });
    puntajes.sort((a, b) => b.puntaje - a.puntaje);
    localStorage.setItem("puntajes", JSON.stringify(puntajes.slice(0, 10)));
    setMostrarPopup("Puntaje guardado!");
    setTimeout(() => setMostrarPopup(""), 2000);
  }

  function reiniciarJuego() {
    setNivelActual(0);
    setPuntaje(0);
    setFinalizado(false);
    setPalabrasUsuario(niveles[0].palabras.map((p) => Array(p.length).fill("")));
    setPalabraSeleccionada(null);
  }

  return (
    <>
      <Navbar /> {/* ahora ocupa todo el ancho */}
      <div className="mini-codycross">
        <h1>Mini CodyCross</h1>
        <h2>
          Nivel {nivelActual + 1}/{niveles.length}
        </h2>
        <p>Puntaje: {puntaje}</p>

        {feedback && (
          <div className={`feedback ${feedback.startsWith("+") ? "positivo" : "negativo"}`}>
            {feedback}
          </div>
        )}

        {/* PISTAS */}
        <div className="pistas-container">
          <button onClick={usarPistaLetra} className="pista-btn">
            🅰️ Letra (-10)
          </button>
          <button onClick={usarPistaPalabra} className="pista-btn">
            🔤 Palabra (-25)
          </button>
          <button onClick={usarPistaMultiple} className="pista-btn">
            🎲 4 Letras (-30)
          </button>
        </div>

        {/* PALABRAS */}
        <div className="palabra-container">
          {nivel.palabras.map((palabra, i) => {
            const arr = palabrasUsuario[i] || Array(palabra.length).fill("");
            const completada = compararPalabrasArray(arr, palabra);
            return (
              <div
                key={i}
                className={`palabra-row ${palabraSeleccionada === i ? "seleccionada" : ""}`}
                onClick={() => setPalabraSeleccionada(i)}
              >
                {Array.from({ length: palabra.length }).map((_, j) => {
                  const esLetraOculta = j === 2;
                  const letra = arr[j] || "";
                  return (
                    <span
                      key={j}
                      className={`letra ${completada ? "correcta" : ""} ${esLetraOculta && letra ? "oculta" : ""}`}
                    >
                      {letra}
                    </span>
                  );
                })}
                <p className="pista">
                  {palabraSeleccionada === i ? "Pista: " + nivel.pistas[i] : ""}
                </p>
              </div>
            );
          })}
        </div>

        <div className="palabra-oculta">
          <h3>Palabra oculta: {obtenerPalabraVertical(palabrasUsuario)}</h3>
        </div>

        {mostrarPopup && <div className="popup">{mostrarPopup}</div>}

        {finalizado && (
          <div className="finalizado">
            <h2>🎉 ¡Juego completado! 🎉</h2>
            <p>Puntaje final: {puntaje}</p>
            <input
              type="text"
              value={nombreJugador}
              onChange={(e) => setNombreJugador(e.target.value)}
              placeholder="Tu nombre"
            />
            <button onClick={guardarPuntaje}>Guardar</button>
            <button onClick={reiniciarJuego}>Reiniciar</button>
          </div>
        )}
      </div>
    </>
  );
}
