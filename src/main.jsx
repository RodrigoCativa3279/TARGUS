import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import EditCuenta from "./pages/editCuenta/editCuenta.jsx";
import ForoComunidad from "./pages/foroComunidad/foroComunidad.jsx";
import Misiones from "./pages/Misiones/Misiones.jsx";
import PagConfig from "./pages/pagConfig/pagConfig.jsx";
import Login from "./pages/Login/Login.jsx";
import Wordle from "./pages/wordle/wordle.jsx";
import Palabras from "./pages/wordle/palabras.json";
import Sudoku from "./pages/sudoku/sudoku.jsx";
import LangingPage from "./pages/Landing/LandingPage.jsx";
import AdivinaPais from "./pages/adivinaPais/AdivinaPais.jsx";
import Crucigrama from "./pages/crucigrama/crucigrama.jsx";



import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter basename="/TARGUS/">
            <Routes>
                <Route path="/" element={<LangingPage />} />
                <Route path="/editCuenta" element={<EditCuenta />} />
                <Route path="/forocomunidad" element={<ForoComunidad />} />
                <Route path="/misiones" element={<Misiones />} />
                <Route path="/pagconfig" element={<PagConfig />} />
                <Route path="/login" element={<Login />} />
                <Route path="/wordle" element={<Wordle />} />
                <Route path="/palabras" element={<Palabras />} />
                <Route path="/sudoku" element={<Sudoku />} />
                <Route path="/home" element={<App />} />
                <Route path="/adivinaPais" element={<AdivinaPais />} />
                <Route path="/crucigrama" element={<Crucigrama />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);
