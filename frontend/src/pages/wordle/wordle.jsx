import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import palabras from "./palabras.json";     // ✅ Palabras válidas para adivinar
import palabras6 from "./palabras5.json";   // ✅ Palabras posibles como solución
import "./wordle.css";
import Navbar from "../../components/navbar/Navbar";

function Wordle() {
    const [solution, setSolution] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0); // 🟢 Puntuación
    const navigate = useNavigate();

    const KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

    // 🟢 Procesar listas
    const palabrasValidas = palabras.map((p) => p.toUpperCase()); // todas las que se pueden escribir
    const palabrasPosibles = palabras6.map((p) => p.toUpperCase()); // las que pueden salir como solución

    // 🟢 Cargar puntuación previa
    useEffect(() => {
        const savedScore = localStorage.getItem("wordleScore");
        if (savedScore) setScore(Number(savedScore));
        startNewGame();
    }, []);

    // 🟢 Guardar puntuación
    useEffect(() => {
        localStorage.setItem("wordleScore", score);
    }, [score]);

    const startNewGame = () => {
        const randomWord = palabrasPosibles[Math.floor(Math.random() * palabrasPosibles.length)];
        setSolution(randomWord);
        setGuesses([]);
        setCurrentGuess("");
        setGameOver(false);
        setMessage("");
    };

    const handleKeyPress = (e) => {
        if (gameOver) return;
        const key = e.key ? e.key.toUpperCase() : "";

        if (key === "ENTER") {
            if (currentGuess.length !== 5) {
                setMessage("La palabra debe tener 5 letras");
                return;
            }
            if (!palabrasValidas.includes(currentGuess.toUpperCase())) {
                setMessage("❌ No es una palabra válida de la lista");
                return;
            }

            const newGuesses = [...guesses, currentGuess.toUpperCase()];
            setGuesses(newGuesses);

            if (currentGuess.toUpperCase() === solution) {
                const puntosGanados = Math.max(0, 100 - (newGuesses.length - 1) * 15);
                setScore((prev) => prev + puntosGanados);
                setMessage(`🎉 ¡Ganaste! +${puntosGanados} puntos`);
                setGameOver(true);
            } else if (newGuesses.length === 6) {
                const puntosPerdidos = 30;
                setScore((prev) => Math.max(0, prev - puntosPerdidos));
                setMessage(`😢 Perdiste (-${puntosPerdidos}). La palabra era: ${solution}`);
                setGameOver(true);
            }

            setCurrentGuess("");
        } else if (key === "BACKSPACE") {
            setCurrentGuess(currentGuess.slice(0, -1));
        } else if (/^[A-Z]$/.test(key)) {
            if (currentGuess.length < 5) setCurrentGuess((prev) => prev + key);
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    });

    return (
        <div>
            <Navbar />
            <div className="wordle-container">
                <h1>Wordle Imposible</h1>
                <h2>🏆 Puntuación: {score}</h2>

                {guesses.map((guess, i) => (
                    <div className="row" key={i}>
                        {guess.split("").map((letter, j) => {
                            let bg = "gray";
                            if (solution[j] === letter) bg = "green";
                            else if (solution.includes(letter)) bg = "gold";
                            return (
                                <span className="cell" key={j} style={{ backgroundColor: bg }}>
                                    {letter}
                                </span>
                            );
                        })}
                    </div>
                ))}

                {!gameOver && (
                    <div className="row">
                        {[...Array(5)].map((_, i) => (
                            <span className="wordle-cell" key={i}>
                                {currentGuess[i] || ""}
                            </span>
                        ))}
                    </div>
                )}

                <p>{message}</p>

                <div className="keyboard">
                    {KEYS.map((key) => (
                        <button
                            key={key}
                            onClick={() => {
                                if (gameOver) return;
                                if (currentGuess.length < 5) setCurrentGuess((prev) => prev + key);
                            }}
                        >
                            {key}
                        </button>
                    ))}
                    <button
                        className="enter"
                        onClick={() => {
                            if (!gameOver) handleKeyPress({ key: "Enter" });
                        }}
                    >
                        ENTER
                    </button>
                    <button
                        className="delete"
                        onClick={() => {
                            if (!gameOver) handleKeyPress({ key: "Backspace" });
                        }}
                    >
                        DELETE
                    </button>
                </div>

                {gameOver && (
                    <div className="menu-final">
                        <button onClick={startNewGame}>🔄 Jugar de nuevo</button>
                        <button onClick={() => navigate("/")}>🏠 Volver al menú</button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Wordle;
