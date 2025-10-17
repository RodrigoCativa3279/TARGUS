import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // estilos de animación

import { useNavigate } from "react-router-dom";
import styles from "./LandingPage.module.scss";

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
                        Bienvenido a <span>SoundVibe</span>
                    </h1>
                    <p>Tu música favorita, en cualquier momento, en cualquier lugar.</p>
                    <button onClick={handleStart}>Comenzá ahora</button>
                </div>
            </section>

            <section className={styles.features}>
                <div className={styles.feature} data-aos="fade-up">
                    <i className="bx bx-library"></i>
                    <h3>Crea tu biblioteca</h3>
                    <p>Organizá tus canciones y playlists como quieras.</p>
                </div>
                <div className={styles.feature} data-aos="fade-up" data-aos-delay="100">
                    <i className="bx bx-headphone"></i>
                    <h3>Escuchá sin límites</h3>
                    <p>Disfrutá música sin interrupciones donde sea.</p>
                </div>
                <div className={styles.feature} data-aos="fade-up" data-aos-delay="200">
                    <i className="bx bx-compass"></i>
                    <h3>Explorá artistas</h3>
                    <p>Descubrí nuevos sonidos y géneros únicos.</p>
                </div>
            </section>

            <section className={styles.testimonials}>
                <h2>Lo que dicen nuestros usuarios</h2>

                <div className={styles.testimonialCard}>
                    <p>"SoundVibe me acompaña todos los días. ¡Lo amo!"</p>
                    <span>- Usuario feliz</span>
                </div>

                <div className={styles.testimonialCard}>
                    <p>"Nunca fue tan fácil encontrar música nueva."</p>
                    <span>- Fanático del rock</span>
                </div>
            </section>

            <footer className={styles.footer}>
                <p>&copy; {new Date().getFullYear()} SoundVibe. Todos los derechos reservados.</p>
            </footer>
        </div>
    );
}
