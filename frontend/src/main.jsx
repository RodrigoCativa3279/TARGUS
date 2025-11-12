import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import EditCuenta from "./pages/editCuenta/editCuenta.jsx";
import PagConfig from "./pages/pagConfig/pagConfig.jsx";
import Login from "./pages/Login/Login.jsx";
import Wordle from "./pages/wordle/wordle.jsx";
import Sudoku from "./pages/sudoku/sudoku.jsx";
import LandingPage from "./pages/Landing/LandingPage.jsx";
import AdivinaPais from "./pages/adivinaPais/AdivinaPais.jsx";
import Crucigrama from "./pages/crucigrama/crucigrama.jsx";
import SopaDeLetras from "./pages/sopaDeLetras/sopaDeLetras.jsx";
import Mathrix from "./pages/mathrix/mathrix.jsx";
import faviconUrl from "./assets/Logo Targus.png";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const ensureFavicon = () => {
    const head = document.head;
    let link = document.querySelector('link[rel="icon"]');
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        head.appendChild(link);
    }
    link.type = 'image/png';
    link.href = faviconUrl;
};
ensureFavicon();

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/home" element={<App />} />
                <Route path="/crucigrama" element={<Crucigrama />} />
                <Route path="/sudoku" element={<Sudoku />} />
                <Route path="/sopaDeLetras" element={<SopaDeLetras />} />
                <Route path="/wordle" element={<Wordle />} />
                <Route path="/adivinaPais" element={<AdivinaPais />} />
                <Route path="/mathrix" element={<Mathrix />} />
                <Route path="/editCuenta" element={<EditCuenta />} />
                <Route path="/pagconfig" element={<PagConfig />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
