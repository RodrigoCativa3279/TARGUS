import React, { useState } from "react";
import "./Crucigrama.css";
import Navbar from "../../components/navbar/Navbar";


import deportesIcon from "../../assets/crucigrama/deportes.png";
import paisesIcon from "../../assets/crucigrama/paises.png";
import animalesIcon from "../../assets/crucigrama/animales.png";
import cienciaIcon from "../../assets/crucigrama/ciencia.png";

const crucigramas = [
  {
    id: 1,
    titulo: "Deportes",
    icono: deportesIcon,
    url: "https://crosswordlabs.com/embed/deporte-457",
  },
  {
    id: 2,
    titulo: "Países",
    icono: paisesIcon,
    url: "https://crosswordlabs.com/embed/paises-468",
  },
  {
    id: 3,
    titulo: "Animales",
    icono: animalesIcon,
    url: "https://crosswordlabs.com/embed/animales-573",
  },
   { 
    id: 4, 
    titulo: "Ciencia y tecnología", 
    icono: cienciaIcon,
    url: "https://crosswordlabs.com/embed/ciencia-y-tecnologia-22", 
  }


];

const Crucigrama = () => {
  const [seleccionado, setSeleccionado] = useState(null);

  return (
    <div className="crucigrama-page">
      <Navbar />

      {!seleccionado ? (
        <div className="menu-crucigramas">
          <h2>Elegí un crucigrama</h2>
          <div className="icon-grid">
            {crucigramas.map((item) => (
              <div
                key={item.id}
                className="icon-card"
                onClick={() => setSeleccionado(item)}
              >
                <img src={item.icono} alt={item.titulo} />
                <p>{item.titulo}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="crucigrama-container">
          <button className="volver-btn" onClick={() => setSeleccionado(null)}>
            ← Volver
          </button>
          <h2>{seleccionado.titulo}</h2>
          <iframe
            title={seleccionado.titulo}
            src={seleccionado.url}
            width="500"
            height="500"
            frameBorder="0"
            style={{
              border: "3px solid black",
              margin: "auto",
              display: "block",
            }}
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Crucigrama;
