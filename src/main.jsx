import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Juego1 from './pages/Juego1.jsx';
import EditCuenta from './pages/editCuenta.jsx'

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/TARGUS/">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/editCuenta" element={<EditCuenta />} />
        <Route path="/juego1" element={<Juego1 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);