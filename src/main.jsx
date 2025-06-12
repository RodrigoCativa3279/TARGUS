import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App.jsx';
import Juego from './pages/Juego.jsx';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/TARGUS">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/juego" element={<Juego />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);