import './App.css';

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="d-flex align-items-center col-10">
          <img src="/img/Titulo.png" className="logo img-fluid" alt="Titulo" />
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

        <div className="collapse navbar-collapse col-2" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active row">
              <a className="nav-link" href="paginaconfig.html">
                <img src="/img/iconcuenta.png" className="iconcuenta rounded-circle img-fluid" alt="Cuenta" />
                <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <div className="principal">
        <div className="destacados">
          <h1 className="categoria">Clasicos</h1>
          <div className="grid-juegos">
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 1.png" alt="Juego 1" />
              <h4 className="tituloJuego">Crucigrama</h4>
              <p className="descripcion">¡Desafía tu mente y divertite completando el crucigrama!</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 2.png" alt="Juego 2" />
              <h4 className="tituloJuego">Sudoku</h4>
              <p className="descripcion">¡Entrená tu lógica con Sudoku y resolvé nuevos desafíos diarios!</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 3.png" alt="Juego 3" />
              <h4 className="tituloJuego">Sopa de letras</h4>
              <p className="descripcion">¡Encontrá todas las palabras ocultas y poné a prueba tu agudeza visual!</p>
            </a>
          </div>
        </div>

        <div className="destacados">
          <h1 className="categoria">Nuevos</h1>
          <div className="grid-juegos">
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 4.png" alt="Juego 4" />
              <h4 className="tituloJuego">Adivina la palabra</h4>
              <p className="descripcion">Gorras</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 5.png" alt="Juego 5" />
              <h4 className="tituloJuego">¿Mayor o menor?</h4>
              <p className="descripcion">Botines</p>
            </a>
            <a href="#" className="juego enlace-juego">
              <img src="/img/Juego 6.png" alt="Juego 6" />
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
