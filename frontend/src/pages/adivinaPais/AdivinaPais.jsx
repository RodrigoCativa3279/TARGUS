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
    const [streak, setStreak] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [difficulty, setDifficulty] = useState(null);
    const [gameStarted, setGameStarted] = useState(false);
    const [usedCountries, setUsedCountries] = useState([]); // 👈 países ya usados

    // función para quitar tildes y normalizar texto
    const normalizeText = (text) => {
        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    };

    // obtener datos según dificultad
    useEffect(() => {
        if (!difficulty) return;
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,translations,population")
            .then((res) => res.json())
            .then((data) => {
                let filtered = [];
                if (difficulty === "facil") {
                    filtered = data.filter((c) => c.population > 50000000);
                } else if (difficulty === "medio") {
                    filtered = data.filter(
                        (c) => c.population >= 10000000 && c.population <= 50000000
                    );
                } else if (difficulty === "dificil") {
                    filtered = data.filter((c) => c.population < 10000000);
                }
                setCountryData(filtered);
                setGameStarted(true);
            })
            .catch(() => alert("Error al cargar datos de países"));
    }, [difficulty]);

    // seleccionar país aleatorio sin repetir
    useEffect(() => {
        if (countryData.length > 0 && round <= 10) {
            let newCountry = null;
            let attempts = 0;

            do {
                const randomNum = Math.floor(Math.random() * countryData.length);
                newCountry = countryData[randomNum];
                attempts++;
                // seguridad: si intenta muchas veces (por si hay pocos países)
                if (attempts > 1000) break;
            } while (usedCountries.includes(newCountry.name.common));

            // si ya no quedan países disponibles, terminar el juego
            if (!newCountry || usedCountries.length >= countryData.length) {
                setGameOver(true);
                return;
            }

            setRandomCountry({
                name: newCountry.name.common,
                officialName: newCountry.name.official,
                flagUrl: newCountry.flags?.svg || newCountry.flags?.png,
                spanishName: newCountry.translations?.spa?.common || newCountry.name.common,
            });
            setUsedCountries((prev) => [...prev, newCountry.name.common]); // registrar país usado
            setCorrect(null);
            setImgLoad(true);
        } else if (round > 10) {
            setGameOver(true);
        }
    }, [round, countryData]);

    const getPointsByDifficulty = (diff) => {
        if (diff === "facil") return 10;
        if (diff === "medio") return 20;
        if (diff === "dificil") return 30;
        return 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!answer.trim()) return;

        const normalizedAnswer = normalizeText(answer);
        const normalizedNames = [
            normalizeText(randomCountry.name),
            normalizeText(randomCountry.officialName),
            normalizeText(randomCountry.spanishName),
        ];

        const correctName = normalizedNames.includes(normalizedAnswer);

        if (correctName) {
            setCorrect(true);
            const basePoints = getPointsByDifficulty(difficulty);
            const streakBonus = streak >= 2 ? 5 * streak : 0;
            const gained = basePoints + streakBonus;
            setScore((prev) => prev + gained);
            setStreak((prev) => prev + 1);
        } else {
            setCorrect(false);
            setStreak(0);
        }
    };

    const nextQuestion = () => {
        setRound((prev) => prev + 1);
        setAnswer("");
    };

    const restartGame = () => {
        setRound(1);
        setScore(0);
        setStreak(0);
        setUsedCountries([]); // 👈 limpiar países usados
        setGameOver(false);
        setDifficulty(null);
        setGameStarted(false);
        setCountryData([]);
    };

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

    if (gameOver) {
        return (
            <>
                <Navbar />
                <div className="results-container">
                    <h1>🎉 ¡Juego terminado!</h1>
                    <p>
                        Tu puntaje final: <strong>{score}</strong> puntos
                    </p>
                    <p>
                        {score >= 250
                            ? "🏆 ¡Eres un experto en geografía!"
                            : score >= 150
                            ? "🌍 Muy bien, conoces bastantes países"
                            : "📚 Sigue practicando, lo harás mejor la próxima"}
                    </p>
                    <button onClick={restartGame}>Jugar de nuevo</button>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <main className="adivina-main">
                <h2>Ronda {round}/10</h2>
                <p className="difficulty-label">
                    Dificultad:{" "}
                    {difficulty === "facil"
                        ? "Fácil"
                        : difficulty === "medio"
                        ? "Media"
                        : "Difícil"}
                </p>

                <p className="score-display">
                    Puntaje: {score} ⭐ | Racha: {streak}
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
                        {correct ? "✅ ¡Correcto!" : `❌ Era ${randomCountry.spanishName}`}
                        <button onClick={nextQuestion}>Siguiente</button>
                    </div>
                )}
            </main>
        </>
    );
}
