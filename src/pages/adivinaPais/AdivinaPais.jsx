import React, { useState, useEffect } from "react";
import "./AdivinaPais.css";
import Navbar from "../../components/navbar/Navbar";

export default function AdivinaPais() {
    const [countryData, setCountryData] = useState([]);
    const [randomCountry, setRandomCountry] = useState({});
    const [round, setRound] = useState(1);
    const [answer, setAnswer] = useState("");
    const [correct, setCorrect] = useState(null);
    const [imgLoad, setImgLoad] = useState(true);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    // obtener datos de países
    useEffect(() => {
        fetch("https://restcountries.com/v3.1/all?fields=name,flags,region")
            .then((res) => res.json())
            .then((data) => {
                const filtered = data.filter(
                    (c) => c.region === "Americas" || c.region === "Europe"
                );
                setCountryData(filtered);
            })
            .catch(() => alert("Error al cargar datos de países"));
    }, []);


    // seleccionar país aleatorio en cada ronda
    useEffect(() => {
        if (countryData.length > 0 && round <= 10) {
            const randomNum = Math.floor(Math.random() * countryData.length);
            const country = countryData[randomNum];
            setRandomCountry({
                name: country.name.common,
                officialName: country.name.official || "",
                flagUrl: country.flags?.svg || country.flags?.png,
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
            randomCountry.officialName.toLowerCase() === normalizedAnswer;

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
    };

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

    return (
        <>
            <Navbar />
            <main className="adivina-main">
                <h2>Ronda {round}/10</h2>
                <div className="flag-container">
                    {imgLoad && <div className="loader"></div>}
                    <img
                        src={randomCountry.flagUrl}
                        alt="Bandera"
                        className={imgLoad ? "hidden" : ""}
                        onLoad={() => setImgLoad(false)}
                    />
                </div>

                {randomCountry.name === "Svalbard and Jan Mayen" && (
                    <p className="hint">👀 Pista: ¡No es Noruega!</p>
                )}

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
                            : `❌ Era ${randomCountry.name}`}
                        <button onClick={nextQuestion}>Siguiente</button>
                    </div>
                )}
            </main>
        </>
    );
}
