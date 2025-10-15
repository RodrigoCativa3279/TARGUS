import "./pagConfig.css";
import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/navbar";

function pagConfig() {
    return (
        <div>
            <Navbar />

            <div className="background">
                <div className="principal">PAGINA DE CONFIGURACION</div>
            </div>
        </div>
    );
}

export default pagConfig;
