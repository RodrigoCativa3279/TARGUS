import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.scss";
import tituloImg from "../../assets/Titulo.png";

export default function LandingPage() {
    const navigate = useNavigate();

    useEffect(() => {
        AOS.init({ duration: 1000 });
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/home");
        }
    }, []);

    const handleStart = () => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/home");
        } else {
            navigate("/login");
        }
    };

    return (
        <div className={styles.landing}>
            <section className={styles.hero}>
                <div className={styles.heroText} data-aos="fade-down">
                    <h1>
                        Bienvenido a <img src={tituloImg} className="logo" alt="Logo principal" />
                    </h1>

                    <p>Desafiá tu mente con juegos que ponen a prueba tu lógica, memoria y velocidad mental.</p>
                    <button onClick={handleStart}>Jugar ahora</button>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.feature} data-aos="fade-up">
                    <i className="bx bx-brain"></i>
                    <h3>Entrená tu cerebro</h3>
                    <p>Mejorá tu concentración, agilidad mental y memoria mientras te divertís.</p>
                </div>
                <div className={styles.feature} data-aos="fade-up" data-aos-delay="100">
                    <i className="bx bx-target-lock"></i>
                    <h3>Superá tus límites</h3>
                    <p>Probá diferentes desafíos y medí tu progreso con cada partida.</p>
                </div>
                <div className={styles.feature} data-aos="fade-up" data-aos-delay="200">
                    <i className="bx bx-joystick"></i>
                    <h3>Divertite aprendiendo</h3>
                    <p>Descubrí nuevas formas de entrenar tu mente de manera entretenida y dinámica.</p>
                </div>
            </section>

            <section className={styles.testimonials}>
                <h2>Lo que dicen nuestros jugadores</h2>

                <div className={styles.testimonialCard}>
                    <p>"Ideal para mantener la mente activa cada día. ¡Muy entretenido!"</p>
                    <span>- Usuario motivado</span>
                </div>

                <div className={styles.testimonialCard}>
                    <p>"Perfecta combinación entre diversión y entrenamiento mental."</p>
                    <span>- Fan de los desafíos</span>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} TARGUS. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
