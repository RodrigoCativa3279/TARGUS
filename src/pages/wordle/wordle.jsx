import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import palabras from "./palabras.json";
import "./wordle.css";
import Navbar from "../../components/navbar/Navbar";

function Wordle() {
    const [solution, setSolution] = useState("");
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrentGuess] = useState("");
    const [gameOver, setGameOver] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

    const palabrasFiltradas = palabras.filter((p) => p.length === 5).map((p) => p.toUpperCase());

    useEffect(() => {
        startNewGame();
    }, []);

    const startNewGame = () => {
        const randomWord = palabrasFiltradas[Math.floor(Math.random() * palabrasFiltradas.length)];
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
            if (!palabrasFiltradas.includes(currentGuess.toUpperCase())) {
                setMessage("❌ No es una palabra válida de la lista");
                return;
            }

            const newGuesses = [...guesses, currentGuess.toUpperCase()];
            setGuesses(newGuesses);

            if (currentGuess.toUpperCase() === solution) {
                setMessage("🎉 ¡Ganaste!");
                setGameOver(true);
            } else if (newGuesses.length === 6) {
                setMessage(`😢 Perdiste. La palabra era: ${solution}`);
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
                            <span className="cell" key={i}>
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
