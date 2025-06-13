import './App.css';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import tituloImg from './assets/Titulo.png';
import menuHamb from './assets/menuHamb.png';
import iconocuenta from './assets/iconocuenta.png';
import juego1 from './assets/Juego 1.png';
import juego2 from './assets/Juego 2.png';
import juego3 from './assets/Juego 3.png';
import juego4 from './assets/Juego 4.png';
import juego5 from './assets/Juego 5.png';
import juego6 from './assets/Juego 6.png';

function App() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <>
      {/*INICIO NAVBAR*/}
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="d-flex align-items-center col-10">
          <Link to="/">
            <img src={tituloImg} className="logo"/>
          </Link>
        </div>
        <button
          className="navbar-toggler col-2"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="col-2 text-right">
          <img
            src={menuHamb}
            className="menuHamb img-fluid"
            alt="Cuenta"
            style={{ cursor: 'pointer' }}
            onClick={toggleMenu}
          />
        </div>
      </nav>

      <div className={`menu-lateral ${menuAbierto ? 'abierto' : ''}`}>
        <button className="cerrar-menu" onClick={toggleMenu}>×</button>
        <div className="usuario">
          <div className="nombre">JuanPedro001</div>
          <img className="iconocuenta img-fluid" src={iconocuenta}/>
        </div>
        
        <ul>
          <li><Link to="/editCuenta" className="botonesMenu">&lt;  Editar cuenta</Link></li>
          <li><a href="#" className="botonesMenu">&lt;  Misiones</a></li>
          <li><a href="#" className="botonesMenu">&lt;  Foro de la comunidad</a></li>
          <li><a href="#" className="botonesMenu">&lt;  Configuración</a></li>
        </ul>
      </div>

      {/*FINAL NAVBAR*/}

      <div className="principal">
        <div className="destacados">
          <h1 className="categoria">Clasicos</h1>
          <div className="grid-juegos">
            <Link to="/juego1" className="juego enlace-juego">
              <img src={juego1} alt="Juego 1" />
              <h4 className="tituloJuego">Crucigrama</h4>
              <p className="descripcion">¡Desafía tu mente y divertite completando el crucigrama!</p>
            </Link>

            <a href="#" className="juego enlace-juego">
              <img src={juego2} alt="Juego 2" />
              <h4 className="tituloJuego">Sudoku</h4>
              <p className="descripcion">¡Entrená tu lógica con Sudoku y resolvé nuevos desafíos diarios!</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src={juego3} alt="Juego 3" />
              <h4 className="tituloJuego">Sopa de letras</h4>
              <p className="descripcion">¡Encontrá todas las palabras ocultas y poné a prueba tu agudeza visual!</p>
            </a>
          </div>
        </div>

        <div className="destacados">
          <h1 className="categoria">Nuevos</h1>
          <div className="grid-juegos">
            <a href="#" className="juego enlace-juego">
              <img src={juego4} alt="Juego 4" />
              <h4 className="tituloJuego">Adivina la palabra</h4>
              <p className="descripcion">Gorras</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src={juego5} alt="Juego 5" />
              <h4 className="tituloJuego">¿Mayor o menor?</h4>
              <p className="descripcion">Botines</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src={juego6} alt="Juego 6" />
              <h4 className="tituloJuego">Adivina el país</h4>
              <p className="descripcion">Camperas deportivas</p>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
