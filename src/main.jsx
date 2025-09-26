import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Juego1 from './pages/Juego1.jsx';
import EditCuenta from './pages/editCuenta.jsx'
import ForoComunidad from './pages/foroComunidad.jsx'
import Misiones from './pages/Misiones.jsx'
import PagConfig from './pages/pagConfig.jsx'
import Login from './pages/Login.jsx'
import Wordle from './pages/wordle.jsx'
import Palabras from './pages/palabras.json'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/TARGUS/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editCuenta" element={<EditCuenta />} />
        <Route path="/forocomunidad" element={<ForoComunidad />} />
        <Route path="/misiones" element={<Misiones />} />
        <Route path="/pagconfig" element={<PagConfig />} />
        <Route path="/juego1" element={<Juego1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/wordle" element={<Wordle />} />
        <Route path="/palabras" element={<Palabras />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);