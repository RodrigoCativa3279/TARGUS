import './Misiones.css';
import React from 'react';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import tituloImg from '../../assets/Titulo.png';
import menuHamb from '../../assets/menuHamb.png';
import iconocuenta from '../../assets/iconocuenta.png'
import Navbar from '../../components/navbar/Navbar'


function Misiones() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const toggleMenu = () => setMenuAbierto(!menuAbierto);

  return (
    <div>
        <Navbar />
        <div className="background">
            <div className="principal">
                MISIONES
            </div>
        </div>
      
    </div>
  );
}

export default Misiones;