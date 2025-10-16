import React, { useState, useEffect } from "react";
import "./sudoku.css";
import Navbar from "../../components/navbar/Navbar";

// 🔹 Generador de Sudoku estable y funcional
const generateSudoku = () => {
    const base = 3;
    const side = base * base;

    // patrón base para filas y columnas
    const pattern = (r, c) => (base * (r % base) + Math.floor(r / base) + c) % side;

    // función para mezclar arrays
    const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

    const rBase = [...Array(base).keys()]; // [0,1,2]
    const rows = [].concat(...rBase.map((r) => rBase.map((g) => g * base + r)));
    const cols = [].concat(...rBase.map((r) => rBase.map((g) => g * base + r)));
    const nums = shuffle([...Array(side).keys()].map((n) => n + 1));

    // crea el tablero base
    const board = rows.map((r) => cols.map((c) => nums[pattern(r, c)]));

    // 🔸 vacía celdas según dificultad (0.55 = medio)
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

    // generar tablero al cargar
    useEffect(() => {
        const newBoard = generateSudoku();
        setBoard(newBoard);
        setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
    }, []);

    // manejar cambios de usuario
    const handleChange = (r, c, value) => {
        if (initialBoard[r][c] !== "") return;
        if (!/^[1-9]?$/.test(value)) return;

        const updated = board.map((row, i) => row.map((cell, j) => (i === r && j === c ? value : cell)));
        setBoard(updated);
    };

    // comprobar solución
    const checkSolution = () => {
        const isValid = (arr) => {
            const nums = arr.filter(Boolean);
            return new Set(nums).size === nums.length;
        };

        for (let row of board) if (!isValid(row)) return setMessage("❌ Error en una fila");
        for (let c = 0; c < 9; c++) {
            const col = board.map((r) => r[c]);
            if (!isValid(col)) return setMessage("❌ Error en una columna");
        }

        for (let br = 0; br < 9; br += 3) {
            for (let bc = 0; bc < 9; bc += 3) {
                const box = [];
                for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(board[br + r][bc + c]);
                if (!isValid(box)) return setMessage("❌ Error en un bloque");
            }
        }

        if (board.flat().includes("")) setMessage("🟡 Aún hay espacios vacíos");
        else setMessage("🎉 ¡Sudoku completo y válido!");
    };

    const newGame = () => {
        const newBoard = generateSudoku();
        setBoard(newBoard);
        setInitialBoard(JSON.parse(JSON.stringify(newBoard)));
        setMessage("");
    };

    if (!board) return <p style={{ textAlign: "center", marginTop: "50px" }}>Cargando Sudoku...</p>;

    return (
        <>
            <Navbar />
            <div className="sudoku-container">
                <h1>Sudoku</h1>

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
