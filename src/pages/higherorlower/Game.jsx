import { useState, useEffect } from "react";
import TwoOptions from "../../components/higherorlower/TwoOptions.jsx";
import { getRandomItems } from "../../helpers/getRandomItems.js";
import Lose from "./Lose.jsx";

const get2RandomItems = getRandomItems(2);
const get1RandomItem = getRandomItems(1);

function Game({ videos, score, setScore, setPages }) {
  const [played, setPlayed] = useState(null);
  const [lose, setLose] = useState(false);

  useEffect(() => {
    if (videos && videos.length >= 2) {
      setPlayed(get2RandomItems(videos));
    }
  }, [videos]);

  const selectRandomVideo = () => {
    if (!videos || videos.length === 0) return;
    let video;
    do {
      video = get1RandomItem(videos);
    } while (played.includes(video[0]) && played.length < 50);
    if (played.length < videos.length) setPlayed((prev) => [video[0], ...prev]);
  };

  const checkStatus = (high) => {
    const [firstVideo, lastVideo] = played;
    const firstCount = parseInt(firstVideo.statistics.viewCount);
    const lastCount = parseInt(lastVideo.statistics.viewCount);
    const isCorrect = high ? firstCount >= lastCount : firstCount <= lastCount;

    if (isCorrect) {
      selectRandomVideo();
      setScore(score + 1);
    } else {
      setLose(true);
    }
  };

  if (!videos || videos.length === 0)
    return (
      <div className="centered">
        ❌ No se pudieron cargar los videos. <br />
        <small>Modo sin conexión</small>
      </div>
    );

  if (!played) return <div className="centered">Cargando...</div>;
  if (lose) return <Lose score={score} setPages={setPages} setScore={setScore} />;

  const [firstVideo, lastVideo] = played;

  return (
    <TwoOptions
      firstVideo={firstVideo}
      lastVideo={lastVideo}
      checkStatus={checkStatus}
      score={score}
    />
  );
}

export default Game;
