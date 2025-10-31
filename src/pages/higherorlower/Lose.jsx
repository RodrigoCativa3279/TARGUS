import logo from "../../assets/logo.png";

function Lose({ score, setPages, setScore }) {
  return (
    <div className="centered">
      <img src={logo} className="logo" alt="Logo" />
      <h2 style={{ fontSize: "2rem", color: "#2f71ffff" }}>TU PUNTAJE: {score}</h2>
      <div>
        <button onClick={() => { setScore(0); setPages(1); }}>JUGAR DE NUEVO</button>
        <button onClick={() => setPages(0)}>VOLVER AL INICIO</button>
      </div>
    </div>
  );
}

export default Lose;
