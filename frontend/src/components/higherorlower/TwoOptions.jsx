import "./TwoOptions.css";
import Navbar from "../navbar/Navbar.jsx";

function TwoOptions({ firstVideo, lastVideo, checkStatus, score }) {
    return (
        <>
            <Navbar />
            <div className="two-options">
                <div className="video-section" style={{ backgroundImage: `url(${lastVideo.snippet.thumbnails.high.url})` }}>
                    <div className="overlay"></div>
                    <div className="content">
                        <h2>"{lastVideo.snippet.title}"</h2>
                        <p className="views">{Number(lastVideo.statistics.viewCount).toLocaleString()} vistas</p>
                    </div>
                </div>

                <div className="video-section" style={{ backgroundImage: `url(${firstVideo.snippet.thumbnails.high.url})` }}>
                    <div className="overlay"></div>
                    <div className="content">
                        <h2>"{firstVideo.snippet.title}"</h2>
                        <div className="buttons">
                            <button onClick={() => checkStatus(true)}>HIGHER</button>
                            <button onClick={() => checkStatus(false)}>LOWER</button>
                        </div>
                        <p className="views">¿Tiene más o menos visualizaciones que {lastVideo.snippet.title}?</p>
                    </div>

                    <div className="scoreboard">
                        <p>PUNTAJE: {score}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TwoOptions;
