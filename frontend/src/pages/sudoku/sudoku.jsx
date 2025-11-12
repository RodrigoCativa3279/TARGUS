import React, { useState, useEffect } from "react";
import "./sudoku.css";
import Navbar from "../../components/navbar/Navbar";

const generateSudoku = () => {
    const base = 3;
    const side = base * base;

    const pattern = (r, c) => (base * (r % base) + Math.floor(r / base) + c) % side;

    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const rBase = [...Array(base).keys()];
    const rows = [].concat(...rBase.map((r) => rBase.map((g) => g * base + r)));
    const cols = [].concat(...rBase.map((r) => rBase.map((g) => g * base + r)));
    const nums = shuffle([...Array(side).keys()].map((n) => n + 1));

    const board = rows.map((r) => cols.map((c) => nums[pattern(r, c)]));

    const empties = Math.floor(side * side * 0.55);
    for (let i = 0; i < empties; i++) {
        const x = Math.floor(Math.random() * side);
        const y = Math.floor(Math.random() * side);
        board[x][y] = "";
    }

    return board;
};

const Sudoku = () => {
    const [board, setBoard] = useState(null);
    const [initialBoard, setInitialBoard] = useState(null);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const newBoard = generateSudoku();
        setBoard(newBoard);
        setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    }, []);

    const handleChange = (r, c, value) => {
        if (initialBoard[r][c] !== "") return;
        if (!/^[1-9]?$/.test(value)) return;

        const updated = board.map((row, i) => row.map((cell, j) => (i === r && j === c ? value : cell)));
        setBoard(updated);
    };

    const checkSolution = () => {
        const nextAttempts = attempts + 1;
        setAttempts(nextAttempts);
        const isValid = (arr) => {
            const nums = arr.filter(Boolean);
            return new Set(nums).size === nums.length;
        };

        for (let row of board) if (!isValid(row)) { setMessage("❌ Error en una fila"); return; }
        for (let c = 0; c < 9; c++) {
            const col = board.map((r) => r[c]);
            if (!isValid(col)) { setMessage("❌ Error en una columna"); return; }
        }

        for (let br = 0; br < 9; br += 3) {
            for (let bc = 0; bc < 9; bc += 3) {
                const box = [];
                for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(board[br + r][bc + c]);
                if (!isValid(box)) { setMessage("❌ Error en un bloque"); return; }
            }
        }

        if (board.flat().includes("")) {
            setMessage("🟡 Aún hay espacios vacíos");
        } else {
            const base = 100;
            const penalty = 10 * (nextAttempts - 1);
            const puntos = Math.max(0, base - penalty);
            setScore((s) => s + puntos);
            setMessage(`🎉 ¡Sudoku completo y válido! +${puntos} puntos`);
        }
    };

    const newGame = () => {
        const newBoard = generateSudoku();
        setBoard(newBoard);
        setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
        setMessage("");
        setAttempts(0);
    };

    if (!board) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando Sudoku...</p>;

    return (
        <>
            <Navbar />
            <div className="sudoku-container">
                <h1>Sudoku</h1>
                <h2 className="score">🏆 Puntuación: {score}</h2>

                <div className="sudoku-grid">{board.map((row, r) => row.map((cell, c) => <input key={`${r}-${c}`} value={cell} onChange={(e) => handleChange(r, c, e.target.value)} className={"cell " + (initialBoard[r][c] !== "" ? "fixed " : "") + ((r + 1) % 3 === 0 && r !== 8 ? "thick-bottom " : "") + ((c + 1) % 3 === 0 && c !== 8 ? "thick-right" : "")} maxLength={1} />))}</div>

                <div className="controls">
                    <button onClick={checkSolution}>Comprobar</button>
                    <button onClick={newGame}>Nuevo juego</button>
                </div>

                <p className="message">{message}</p>
            </div>
        </>
    );
};

export default Sudoku;
