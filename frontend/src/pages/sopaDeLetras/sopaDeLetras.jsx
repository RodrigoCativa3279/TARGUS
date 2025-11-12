import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./sopaDeLetras.css";
import wordsData from "../wordle/palabras5.json";
import Navbar from "../../components/navbar/Navbar";

const Cell = ({ letter, i, j, onMouseDown, onMouseEnter, selected, gameOver }) => {
    return (
        <div
            className={`sopa-cell ${selected ? "selected" : ""} ${gameOver ? "blocked" : ""}`}
            onMouseDown={() => !gameOver && onMouseDown(i, j)}
            onMouseEnter={() => !gameOver && onMouseEnter(i, j)}
        >
            {letter}
        </div>
    );
};

export default function SopaDeLetras() {
    const navigate = useNavigate();
    const boardSize = 15;

    const [words, setWords] = useState([]);
    const [board, setBoard] = useState([]);
    const [selecting, setSelecting] = useState(false);
    const [currentSelection, setCurrentSelection] = useState([]);
    const [selectionDirection, setSelectionDirection] = useState(null);
    const [foundCells, setFoundCells] = useState([]);
    const [showBoard, setShowBoard] = useState(false);
    const [usedHints, setUsedHints] = useState([]);
    const [gameStarted, setGameStarted] = useState(false);

    // Cronómetro y puntuación
    const [time, setTime] = useState(0);
    const [timerActive, setTimerActive] = useState(false);
    const [score, setScore] = useState(null);

    // 👇 Nueva variable: indica si el juego terminó o se reveló
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => setTime((t) => t + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timerActive]);

    const generateBoard = (selectedWords) => {
        let tempBoard = Array.from({ length: boardSize }, () =>
            Array.from({ length: boardSize }, () => " ")
        );

        const directions = ["horizontal", "vertical", "diagonal"];

        const placeWord = (word) => {
            let placed = false;
            let attempts = 0;

            while (!placed && attempts < 200) {
                const direction = directions[Math.floor(Math.random() * directions.length)];
                const row = Math.floor(Math.random() * boardSize);
                const col = Math.floor(Math.random() * boardSize);
                let fits = true;

                for (let i = 0; i < word.length; i++) {
                    let r = row, c = col;
                    if (direction === "horizontal") c += i;
                    if (direction === "vertical") r += i;
                    if (direction === "diagonal") { r += i; c += i; }
                    if (r >= boardSize || c >= boardSize || 
                        (tempBoard[r][c] !== " " && tempBoard[r][c] !== word[i])) {
                        fits = false; break;
                    }
                }

                if (fits) {
                    for (let i = 0; i < word.length; i++) {
                        let r = row, c = col;
                        if (direction === "horizontal") c += i;
                        if (direction === "vertical") r += i;
                        if (direction === "diagonal") { r += i; c += i; }
                        tempBoard[r][c] = word[i];
                    }
                    placed = true;
                }
                attempts++;
            }
        };

        selectedWords.forEach(placeWord);

        for (let i = 0; i < boardSize; i++) {
            for (let j = 0; j < boardSize; j++) {
                if (tempBoard[i][j] === " ") {
                    tempBoard[i][j] = String.fromCharCode(65 + Math.floor(Math.random() * 26));
                }
            }
        }

        setBoard(tempBoard);
        setShowBoard(true);
        setFoundCells([]);
        setCurrentSelection([]);
        setSelecting(false);
        setSelectionDirection(null);
        setUsedHints([]);
        setTime(0);
        setTimerActive(true);
        setScore(null);
        setGameOver(false);
    };

    const startSelection = (i, j) => {
        if (gameOver) return;
        setSelecting(true);
        setCurrentSelection([{ i, j }]);
        setSelectionDirection(null);
    };

    const continueSelection = (i, j) => {
        if (!selecting || gameOver) return;

        if (currentSelection.length === 1) {
            const first = currentSelection[0];
            const deltaI = i - first.i;
            const deltaJ = j - first.j;

            const stepI = deltaI === 0 ? 0 : deltaI / Math.abs(deltaI);
            const stepJ = deltaJ === 0 ? 0 : deltaJ / Math.abs(deltaJ);

            if (stepI === 0 && stepJ === 0) return;
            setSelectionDirection({ stepI, stepJ });
        } else if (selectionDirection) {
            const last = currentSelection[currentSelection.length - 1];
            const { stepI, stepJ } = selectionDirection;
            if (i - last.i !== stepI || j - last.j !== stepJ) return;
        }

        const exists = currentSelection.some((cell) => cell.i === i && cell.j === j);
        if (!exists) setCurrentSelection([...currentSelection, { i, j }]);
    };

    const finishSelection = () => {
        if (gameOver) return;
        setSelecting(false);
        setSelectionDirection(null);

        const word = currentSelection.map((cell) => board[cell.i][cell.j]).join("");
        const reversedWord = word.split("").reverse().join("");

        if (words.includes(word) || words.includes(reversedWord)) {
            setFoundCells([...foundCells, ...currentSelection]);
        }

        setCurrentSelection([]);
    };

    useEffect(() => {
        const handleMouseUp = () => {
            if (selecting) finishSelection();
        };
        window.addEventListener("mouseup", handleMouseUp);
        return () => window.removeEventListener("mouseup", handleMouseUp);
    }, [selecting, currentSelection, board]);

    const isSelected = (i, j) => {
        return (
            currentSelection.some((cell) => cell.i === i && cell.j === j) ||
            foundCells.some((cell) => cell.i === i && cell.j === j)
        );
    };

    const giveHint = () => {
        if (gameOver) return;
        const remainingWords = words.filter((word) => !usedHints.includes(word));
        if (remainingWords.length === 0) return;

        const hintWord = remainingWords[0];
        setUsedHints([...usedHints, hintWord]);

        outer2: for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                const directions = [
                    { dr: 0, dc: 1 },
                    { dr: 1, dc: 0 },
                    { dr: 1, dc: 1 },
                ];

                for (let d of directions) {
                    let letters = "";
                    let positions = [];

                    for (let k = 0; k < hintWord.length; k++) {
                        const r = row + k * d.dr;
                        const c = col + k * d.dc;
                        if (r >= boardSize || c >= boardSize) break;
                        letters += board[r][c];
                        positions.push({ i: r, j: c });
                    }

                    if (
                        letters === hintWord ||
                        letters.split("").reverse().join("") === hintWord
                    ) {
                        const firstPos = positions[0];
                        setFoundCells((prev) => [...prev, firstPos]);
                        break outer2;
                    }
                }
            }
        }
    };

    // 👇 Botón Revelar — tipo A
    const revealAll = () => {
        if (gameOver) return;

        let allPositions = [];
        words.forEach((word) => {
            outer: for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const directions = [
                        { dr: 0, dc: 1 },
                        { dr: 1, dc: 0 },
                        { dr: 1, dc: 1 },
                    ];

                    for (let d of directions) {
                        let letters = "";
                        let positions = [];

                        for (let k = 0; k < word.length; k++) {
                            const r = row + k * d.dr;
                            const c = col + k * d.dc;
                            if (r >= boardSize || c >= boardSize) break;
                            letters += board[r][c];
                            positions.push({ i: r, j: c });
                        }

                        if (letters === word || letters.split("").reverse().join("") === word) {
                            allPositions.push(...positions);
                            break outer;
                        }
                    }
                }
            }
        });

        setFoundCells(allPositions);
        setTimerActive(false);
        setScore(0);
        setGameOver(true); // bloquea interacción
    };

    const hasWon =
        board.length > 0 &&
        words.every((word) => {
            outer: for (let row = 0; row < boardSize; row++) {
                for (let col = 0; col < boardSize; col++) {
                    const directions = [
                        { dr: 0, dc: 1 },
                        { dr: 1, dc: 0 },
                        { dr: 1, dc: 1 },
                    ];

                    for (let d of directions) {
                        let letters = "";
                        let positions = [];

                        for (let k = 0; k < word.length; k++) {
                            const r = row + k * d.dr;
                            const c = col + k * d.dc;
                            if (r >= boardSize || c >= boardSize) break;
                            letters += board[r][c];
                            positions.push({ i: r, j: c });
                        }

                        if (letters === word || letters.split("").reverse().join("") === word) {
                            const allFound = positions.every((pos) =>
                                foundCells.some((f) => f.i === pos.i && f.j === pos.j)
                            );
                            if (allFound) return true;
                        }
                    }
                }
            }
            return false;
        });

    useEffect(() => {
        if (hasWon && !gameOver) {
            setTimerActive(false);
            const finalScore = Math.max(0, 1000 - time * 2 - usedHints.length * 50);
            setScore(finalScore);
            setGameOver(true);
        }
    }, [hasWon]);

    const selectRandomWords = () => {
        const shuffled = [...wordsData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 8).map((w) => w.toUpperCase());
    };

    const startGame = () => {
        const selectedWords = selectRandomWords();
        setWords(selectedWords);
        setGameStarted(true);
        generateBoard(selectedWords);
    };

    const formatTime = (t) => {
        const m = Math.floor(t / 60).toString().padStart(2, "0");
        const s = (t % 60).toString().padStart(2, "0");
        return `${m}:${s}`;
    };

    return (
        <>
            <Navbar />

            {!gameStarted && (
                <div className="menu-container">
                    <h1>Sopa de Letras</h1>
                    <button className="start-btn" onClick={startGame}>
                        Jugar
                    </button>
                </div>
            )}

            {gameStarted && (
                <div className="sopa-wrapper">
                    <div className={`sopa-container ${hasWon ? "blur-board" : ""}`}>
                        <div className="buttons-group">
                            <button className="hint-btn" onClick={giveHint}>
                                Pista ({usedHints.length})
                            </button>
                            <button className="reveal-btn" onClick={revealAll}>
                                Revelar
                            </button>
                        </div>

                        <div className="game-info">
                            <p>Tiempo: {formatTime(time)}</p>
                            <p>Puntuación: {score !== null ? score : "---"}</p>
                        </div>

                        {showBoard && (
                            <div className="board">
                                {board.map((row, i) => (
                                    <div key={i} className="board-row">
                                        {row.map((letter, j) => (
                                            <Cell
                                                key={j}
                                                letter={letter}
                                                i={i}
                                                j={j}
                                                selected={isSelected(i, j)}
                                                onMouseDown={startSelection}
                                                onMouseEnter={continueSelection}
                                                gameOver={gameOver}
                                            />
                                        ))}
                                    </div>
                                ))}

                                <div className="word-list">
                                    {words.map((word, i) => {
                                        let foundWord = false;
                                        outer: for (let row = 0; row < boardSize; row++) {
                                            for (let col = 0; col < boardSize; col++) {
                                                const directions = [
                                                    { dr: 0, dc: 1 },
                                                    { dr: 1, dc: 0 },
                                                    { dr: 1, dc: 1 },
                                                ];

                                                for (let d of directions) {
                                                    let letters = "";
                                                    let positions = [];

                                                    for (let k = 0; k < word.length; k++) {
                                                        const r = row + k * d.dr;
                                                        const c = col + k * d.dc;
                                                        if (r >= boardSize || c >= boardSize) break;
                                                        letters += board[r][c];
                                                        positions.push({ i: r, j: c });
                                                    }

                                                    if (
                                                        letters === word ||
                                                        letters.split("").reverse().join("") === word
                                                    ) {
                                                        const allFound = positions.every((pos) =>
                                                            foundCells.some(
                                                                (f) => f.i === pos.i && f.j === pos.j
                                                            )
                                                        );
                                                        if (allFound) {
                                                            foundWord = true;
                                                            break outer;
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        return (
                                            <p
                                                key={i}
                                                style={{
                                                    textDecoration: foundWord
                                                        ? "line-through"
                                                        : "none",
                                                }}
                                            >
                                                - {word}
                                            </p>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {(hasWon || gameOver) && (
                        <div className="win-message">
                            <h2>{hasWon ? "¡Ganaste!" : "Juego Revelado"}</h2>
                            <p>Tiempo final: {formatTime(time)}</p>
                            <p>Pistas usadas: {usedHints.length}</p>
                            <p>Puntuación: {score}</p>
                            <button onClick={startGame}>Volver a jugar</button>
                            <button onClick={() => navigate("/home")}>Menú principal</button>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
