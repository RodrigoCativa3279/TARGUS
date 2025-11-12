import { useState } from "react";
import "./mathrix.css";
import Navbar from "../../components/navbar/Navbar";
import juego5 from "../../assets/Juego 5.png";

export default function Mathrix() {
  const [level, setLevel] = useState(1);
  const [grid, setGrid] = useState(generateGrid(level));
  const [wrong, setWrong] = useState({ rows: [], cols: [] });
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  function generateGrid(lvl) {
    const size = 3;
    const allowedOps =
      lvl === 1 ? ["+", "-"] : lvl === 2 ? ["×", "÷"] : ["+", "-", "×", "÷"];

    const newGrid = [];
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        const minVal = lvl === 2 ? 2 : 1;
        const maxVal = lvl === 3 ? 15 : 12; // aumentar dificultad por nivel
        const solution = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
        const editable = Math.random() < 0.5;
        row.push({
          solution,
          editable,
          value: editable ? "" : solution,
        });
      }
      newGrid.push(row);
    }

    const horizontalOps = Array.from({ length: size }, () =>
      Array.from({ length: size - 1 }, () =>
        allowedOps[Math.floor(Math.random() * allowedOps.length)]
      )
    );
    const verticalOps = Array.from({ length: size - 1 }, () =>
      Array.from({ length: size }, () =>
        allowedOps[Math.floor(Math.random() * allowedOps.length)]
      )
    );

    const divisorsOf = (n, minDiv) => {
      const ds = [];
      for (let k = minDiv; k <= 12; k++) if (n % k === 0) ds.push(k);
      return ds;
    };
    const randPick = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const minDiv = lvl === 2 ? 2 : 1;
    for (let pass = 0; pass < 2; pass++) {
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size - 1; c++) {
          if (horizontalOps[r][c] === "÷") {
            const a = newGrid[r][c].solution;
            let candidates = divisorsOf(a, minDiv);
            if (r > 0 && verticalOps[r - 1][c + 0] === "÷") {
              const topA = newGrid[r - 1][c + 0].solution;
              const topDivs = divisorsOf(topA, minDiv);
              candidates = candidates.filter((x) => topDivs.includes(x));
            }
            if (candidates.length === 0) candidates = [minDiv];
            const b = randPick(candidates);
            newGrid[r][c + 1].solution = b;
            if (!newGrid[r][c + 1].editable) newGrid[r][c + 1].value = b;
          }
        }
      }
      for (let r = 0; r < size - 1; r++) {
        for (let c = 0; c < size; c++) {
          if (verticalOps[r][c] === "÷") {
            const a = newGrid[r][c].solution;
            let candidates = divisorsOf(a, minDiv);
            if (c > 0 && horizontalOps[r + 0][c - 1] === "÷") {
              const leftA = newGrid[r + 0][c - 1].solution;
              const leftDivs = divisorsOf(leftA, minDiv);
              candidates = candidates.filter((x) => leftDivs.includes(x));
            }
            if (candidates.length === 0) candidates = [minDiv];
            const b = randPick(candidates);
            newGrid[r + 1][c].solution = b;
            if (!newGrid[r + 1][c].editable) newGrid[r + 1][c].value = b;
          }
        }
      }
    }

    const applyOp = (a, op, b) => {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "×":
          return a * b;
        case "÷":
          return b === 0 ? NaN : Math.trunc(a / b);
        default:
          return NaN;
      }
    };

    const rowResults = newGrid.map((row, r) => {
      let acc = row[0].solution;
      for (let c = 0; c < size - 1; c++) {
        acc = applyOp(acc, horizontalOps[r][c], row[c + 1].solution);
      }
      return acc;
    });

    const colResults = Array.from({ length: size }, (_, c) => {
      let acc = newGrid[0][c].solution;
      for (let r = 0; r < size - 1; r++) {
        acc = applyOp(acc, verticalOps[r][c], newGrid[r + 1][c].solution);
      }
      return acc;
    });

    if (lvl === 2) {
      const hasZero = rowResults.some((v) => v === 0) || colResults.some((v) => v === 0);
      if (hasZero) return generateGrid(lvl);
    }

    return { newGrid, rowResults, colResults, horizontalOps, verticalOps, allowedOps };
  }

  const handleInput = (r, c, val) => {
    const newData = structuredClone(grid);
    if (val === "") {
      newData.newGrid[r][c].value = "";
    } else {
      // permitir dos dígitos y 0/1 durante la edición
      const cleaned = val.replace(/[^0-9]/g, "").slice(0, 2);
      if (cleaned === "") {
        newData.newGrid[r][c].value = "";
      } else {
        let n = parseInt(cleaned, 10);
        const max = level === 3 ? 15 : 12;
        if (n > max) n = max;
        newData.newGrid[r][c].value = n;
      }
    }
    setGrid(newData);
  };

  const checkAnswers = () => {
    const { newGrid, rowResults, colResults, horizontalOps, verticalOps } = grid;
    const size = newGrid.length;

    const asNumber = (cell) =>
      cell.editable ? (cell.value === "" ? NaN : parseInt(cell.value, 10)) : cell.solution;

    const applyOp = (a, op, b) => {
      switch (op) {
        case "+":
          return a + b;
        case "-":
          return a - b;
        case "×":
          return a * b;
        case "÷":
          return b === 0 ? NaN : Math.trunc(a / b);
        default:
          return NaN;
      }
    };

    let correctRows = 0;
    const wrongRows = [];
    for (let r = 0; r < size; r++) {
      let accRow = asNumber(newGrid[r][0]);
      if (isNaN(accRow)) {
        accRow = NaN;
      } else {
        for (let c = 0; c < size - 1; c++) {
          const next = asNumber(newGrid[r][c + 1]);
          if (isNaN(next)) {
            accRow = NaN;
            break;
          }
          accRow = applyOp(accRow, horizontalOps[r][c], next);
        }
      }
      if (!isNaN(accRow) && accRow === rowResults[r]) {
        correctRows += 1;
      } else {
        wrongRows.push(r);
      }
    }

    let correctCols = 0;
    const wrongCols = [];
    for (let c = 0; c < size; c++) {
      let accCol = asNumber(newGrid[0][c]);
      if (isNaN(accCol)) {
        accCol = NaN;
      } else {
        for (let r = 0; r < size - 1; r++) {
          const next = asNumber(newGrid[r + 1][c]);
          if (isNaN(next)) {
            accCol = NaN;
            break;
          }
          accCol = applyOp(accCol, verticalOps[r][c], next);
        }
      }
      if (!isNaN(accCol) && accCol === colResults[c]) {
        correctCols += 1;
      } else {
        wrongCols.push(c);
      }
    }

    // aumentar intento al presionar comprobar
    const nextAttempts = attempts + 1;
    setAttempts(nextAttempts);
    const allOk = correctRows === size && correctCols === size;
    setWrong({ rows: wrongRows, cols: wrongCols });
    if (allOk) {
      const base = 100;
      const penalty = 15 * (nextAttempts - 1);
      const levelBonus = 10 * (level - 1);
      const puntos = Math.max(0, base - penalty) + levelBonus;
      setScore((s) => s + puntos);
      setFeedback({ type: "success", message: `¡Correcto! +${puntos} puntos` });
    } else {
      const nameRow = (i) => (i === 0 ? "Fila superior" : i === size - 1 ? "Fila inferior" : `Fila ${i + 1}`);
      const nameCol = (i) => (i === 0 ? "Columna izquierda" : i === size - 1 ? "Columna derecha" : `Columna ${i + 1}`);
      const rowHints = wrongRows.length ? `Filas incorrectas: ${wrongRows.map(nameRow).join(", ")}.` : "";
      const colHints = wrongCols.length ? `Columnas incorrectas: ${wrongCols.map(nameCol).join(", ")}.` : "";
      const hint = [rowHints, colHints].filter(Boolean).join(" ");
      setFeedback({ type: "error", message: hint || "Hay errores. Inténtalo de nuevo." });
    }
  };

  const reset = () => {
    setGrid(generateGrid(level));
    setWrong({ rows: [], cols: [] });
    setFeedback({ type: "", message: "" });
    setAttempts(0);
  };

  if (!gameStarted) {
    return (
      <>
        <Navbar />
        <div className="difficulty-screen">
          <img src={juego5} alt="Mathrix" className="logo-juego" />
          <h1 className="titulo">MATHRIX</h1>
          <p>Selecciona la dificultad para comenzar:</p>
          <div className="difficulty-buttons">
            <button onClick={() => { setLevel(1); setGrid(generateGrid(1)); setGameStarted(true); }}>FÁCIL</button>
            <button onClick={() => { setLevel(2); setGrid(generateGrid(2)); setGameStarted(true); }}>MEDIO</button>
            <button onClick={() => { setLevel(3); setGrid(generateGrid(3)); setGameStarted(true); }}>DIFÍCIL</button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mathrix-container">
        <img src={juego5} alt="mathrix" className="logo-juego" />
        <div className="controls">
          <label>
            Nivel:
            <select
              value={level}
              onChange={(e) => {
                const lvl = parseInt(e.target.value);
                setLevel(lvl);
                setGrid(generateGrid(lvl));
                setFeedback({ type: "", message: "" });
                setAttempts(0);
              }}
            >
              <option value={1}>1 (Sumas/Restas)</option>
              <option value={2}>2 (Multiplicación/División)</option>
              <option value={3}>3 (Mixto)</option>
            </select>
          </label>
          <button onClick={reset}>Reiniciar</button>
        </div>

        <h2 className="score">🏆 Puntuación: {score}</h2>

        {feedback.message && (
          <div className={`mathrix-feedback ${feedback.type}`}>
            {feedback.message}
          </div>
        )}

        <p className="instructions">
          Completa los cuadros vacíos. Los signos indican las operaciones entre
          los números. Los valores objetivo están al final de cada fila y columna.
          <br /> <strong>IMPORTANTE:</strong> No hay orden de operaciones, se resuelve de izquierda a derecha por <strong>fila</strong> y de arriba a abajo por <strong>columna</strong>.
        </p>

        <div className="matrix-wrapper">
          <table className="math-table">
            <tbody>
              {grid.newGrid.map((row, r) => (
                <>
                  <tr key={`row-${r}`}>
                    {row.map((cell, c) => (
                      <>
                        <td
                          key={`cell-${r}-${c}`}
                          className={
                            cell.editable && cell.value === "" ? "empty-cell" : ""
                          }
                        >
                          {cell.editable ? (
                            <input
                              type="number"
                              value={cell.value}
                              onChange={(e) => handleInput(r, c, e.target.value)}
                              className={`editable ${cell.value === "" ? "empty" : ""}`}
                              min={0}
                              max={level === 3 ? 15 : 12}
                              placeholder=" "
                            />
                          ) : (
                            <div className="fixed">{cell.solution}</div>
                          )}
                        </td>
                        {c < row.length - 1 && (
                          <td key={`hop-${r}-${c}`} className="signo">
                            {grid.horizontalOps[r][c]}
                          </td>
                        )}
                      </>
                    ))}
                    <td className={`objetivo ${wrong.rows?.includes(r) ? "wrong" : ""}`}>{grid.rowResults[r]}</td>
                  </tr>
                  {r < grid.newGrid.length - 1 && (
                    <tr key={`ops-row-${r}`}>
                      {Array.from({ length: row.length * 2 - 1 }, (_, k) => (
                        k % 2 === 0 ? (
                          <td key={`vop-${r}-${k}`} className="signo-col">
                            {grid.verticalOps[r][k / 2 | 0]}
                          </td>
                        ) : (
                          <td key={`sp-${r}-${k}`} className="spacer"></td>
                        )
                      ))}
                      <td className="spacer" />
                    </tr>
                  )}
                </>
              ))}

              <tr>
                {Array.from({ length: grid.newGrid[0].length * 2 - 1 }, (_, k) => (
                  k % 2 === 0 ? (
                    <td
                      key={`colres-${k}`}
                      className={`objetivo ${wrong.cols?.includes((k / 2) | 0) ? "wrong" : ""}`}
                    >
                      {grid.colResults[(k / 2) | 0]}
                    </td>
                  ) : (
                    <td key={`bsp-${k}`} className="spacer"></td>
                  )
                ))}
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <button onClick={checkAnswers} className="check-btn">Comprobar</button>
      </div>
    </>
  );
}
