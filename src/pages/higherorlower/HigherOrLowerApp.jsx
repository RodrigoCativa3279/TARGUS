import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Initial from "./Initial.jsx";
import Game from "./Game.jsx";
import Lose from "./Lose.jsx";
import { useVideos } from "../../hooks/useVideos.js"; 

function HigherOrLowerApp() {
  const { videos, loading, error } = useVideos();
  const [score, setScore] = useState(0);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: "30px" }}>Cargando videos...</div>;

  return (
    <Routes>
      <Route path="/" element={<Initial />} />
      <Route
        path="game"
        element={
          error || !videos || videos.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              No se pudieron cargar los videos. No se puede jugar a "Mayor o Menor".
            </div>
          ) : (
            <Game key={score} videos={videos} score={score} setScore={setScore} />
          )
        }
      />
      <Route path="lose" element={<Lose score={score} setScore={setScore} />} />
    </Routes>
  );
}

export default HigherOrLowerApp;
