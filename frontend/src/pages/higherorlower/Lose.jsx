import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Navbar from "../../components/navbar/Navbar.jsx";

function Lose({ score, setScore }) {
  const navigate = useNavigate();

  const handleRestart = () => {
    setScore(0);
    navigate("/higherorlower/game");
  };

  const handleHome = () => {
    setScore(0);
    navigate("/higherorlower");
  };

  return (
    <>
      <Navbar />
      <div className="centered">
        <img src={logo} className="logo" alt="Logo" />
        <h2 style={{ fontSize: "2rem", color: "#2f71ffff" }}>TU PUNTAJE: {score}</h2>
        <div>
          <button onClick={handleRestart}>JUGAR DE NUEVO</button>
          <button onClick={handleHome}>VOLVER AL INICIO</button>
        </div>
      </div>
    </>
  );
}

export default Lose;
