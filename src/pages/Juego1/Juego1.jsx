import "./Juego1.css";
import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/navbar/Navbar";

function Juego1() {
    return (
        <div>
            <Navbar />
            <div className="background">
                <div className="principal">JUEGO 1 - Crucigrama</div>
            </div>
        </div>
    );
}

export default Juego1;
