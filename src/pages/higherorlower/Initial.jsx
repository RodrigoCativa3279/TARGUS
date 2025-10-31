import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import Navbar from "../../components/navbar/Navbar";

function Initial() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="centered">
        <img src={logo} className="logo" alt="Logo" />
        <button onClick={() => navigate("/higherorlower/game")}>JUGAR</button>
      </div>
    </>
  );
}

export default Initial;
