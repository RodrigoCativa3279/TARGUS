import React, { useState, useEffect } from "react";
import "./AdivinaPais.css";
import Navbar from "../../components/navbar/Navbar";
import juego6 from "../../assets/Juego 6.png";


export default function AdivinaPais() {
    const [countryData, setCountryData] = useState([]);
    const [randomCountry, setRandomCountry] = useState({});
    const [round, setRound] = useState(1);
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(null);
    const [imgLoad, setImgLoad] = useState(true);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState(null); // null = aún no elegida
    const [gameStarted, setGameStarted] = useState(false);

    // obtener datos de países según dificultad
    useEffect(() => {
        if (!difficulty) return;
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,translations,population")
            .then((res) => res.json())
            .then((data) => {
                let filtered = [];
                if (difficulty === "facil") {
                    filtered = data.filter((c) => c.population > 50000000); // +50M
                } else if (difficulty === "medio") {
                    filtered = data.filter(
                        (c) => c.population >= 10000000 && c.population <= 50000000
                    ); // 10M–50M
                } else if (difficulty === "dificil") {
                    filtered = data.filter((c) => c.population < 10000000); // <10M
                }
                setCountryData(filtered);
                setGameStarted(true);
            })
            .catch(() => alert("Error al cargar datos de países"));
    }, [difficulty]);

    // seleccionar país aleatorio
    useEffect(() => {
        if (countryData.length > 0 && round <= 10) {
            const randomNum = Math.floor(Math.random() * countryData.length);
            const country = countryData[randomNum];
            setRandomCountry({
                name: country.name.common,
                officialName: country.name.official,
                flagUrl: country.flags?.svg || country.flags?.png,
                spanishName: country.translations?.spa?.common || country.name.common,
            });
            setCorrect(null);
            setImgLoad(true);
        } else if (round > 10) {
            setGameOver(true);
        }
    }, [round, countryData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!answer.trim()) return;
        const normalizedAnswer = answer.toLowerCase();
        const correctName =
            randomCountry.name.toLowerCase() === normalizedAnswer ||
            randomCountry.officialName.toLowerCase() === normalizedAnswer ||
            randomCountry.spanishName.toLowerCase() === normalizedAnswer;

        if (correctName) {
            setCorrect(true);
            setScore((prev) => prev + 1);
        } else {
            setCorrect(false);
        }
    };

    const nextQuestion = () => {
        setRound((prev) => prev + 1);
        setAnswer("");
    };

    const restartGame = () => {
        setRound(1);
        setScore(0);
        setGameOver(false);
        setDifficulty(null);
        setGameStarted(false);
        setCountryData([]);
    };

    // pantalla de selección de dificultad
    if (!gameStarted) {
        return (
            <>
                <Navbar />
                <div className="difficulty-screen">
                    <img src={juego6} alt="Adivina el País" className="logo-juego" />
                    <h1 className="titulo">ADIVINA EL PAÍS</h1>
                    <p>Selecciona la dificultad para comenzar:</p>
                    <div className="difficulty-buttons">
                        <button onClick={() => setDifficulty("facil")}>FÁCIL</button>
                        <button onClick={() => setDifficulty("medio")}>MEDIO</button>
                        <button onClick={() => setDifficulty("dificil")}>DIFÍCIL</button>
                    </div>
                </div>
            </>
        );
    }

    // pantalla final del juego
    if (gameOver) {
        return (
            <>
                <Navbar />
                <div className="results-container">
                    <h1>🎉 ¡Juego terminado!</h1>
                    <p>Tu puntaje final: {score}/10</p>
                    <button onClick={restartGame}>Jugar de nuevo</button>
                </div>
            </>
        );
    }

    // pantalla principal del juego
    return (
        <>
            <Navbar />
            <main className="adivina-main">
                <h2>Ronda {round}/10</h2>
                <p className="difficulty-label">
                    Dificultad: {difficulty === "facil" ? "Fácil" : difficulty === "medio" ? "Media" : "Difícil"}
                </p>

                <div className="flag-container">
                    {imgLoad && <div className="loader"></div>}
                    <img
                        src={randomCountry.flagUrl}
                        alt="Bandera"
                        className={imgLoad ? "hidden" : ""}
                        onLoad={() => setImgLoad(false)}
                    />
                </div>

                <form onSubmit={handleSubmit} className="answer-form">
                    <input
                        type="text"
                        placeholder="Escribe el país..."
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        disabled={correct !== null}
                    />
                    <button type="submit" disabled={correct !== null}>
                        ➜
                    </button>
                </form>

                {correct !== null && (
                    <div className={`feedback ${correct ? "correct" : "wrong"}`}>
                        {correct
                            ? "✅ ¡Correcto!"
                            : `❌ Era ${randomCountry.spanishName}`}
                        <button onClick={nextQuestion}>Siguiente</button>
                    </div>
                )}
            </main>
        </>
    );
}
