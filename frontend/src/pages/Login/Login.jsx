import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import loginIllustration from "../../assets/img-login.svg";
import TituloLogo from "../../assets/Titulo.png";

export default function Login() {
    const [showSignUp, setShowSignUp] = useState(false);

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username.trim(),
                    email: formData.email.trim(),
                    password: formData.password.trim(),
                }),
            });

            const data = await res.json();
            console.log("Respuesta del backend (registro):", data);

            if (!res.ok) {
                alert(data.error || "Error en el registro");
                return;
            }

            alert(data.message || "Usuario registrado correctamente");
            setShowSignUp(false);
            setFormData({ username: "", email: "", password: "" });
        } catch (error) {
            console.error("❌ Error de red o conexión en registro:", error);
            alert("Error en el registro. Verifica el servidor.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: formData.username.trim(),
                    password: formData.password.trim(),
                }),
            });

            const data = await res.json();
            console.log("Respuesta del backend (login):", data);

            if (res.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));

                navigate("/home");
            } else {
                alert(data.error || "Credenciales inválidas");
            }
        } catch (error) {
            console.error("❌ Error en el login:", error);
            alert("Error en el login. Verifica el servidor.");
        }
    };

    return (
        <div className="login">
            <div className="login__content">
                <div className="login__forms">
                    <img src={TituloLogo} alt="Targus" className="login__logo" />
                    {showSignUp ? (
                        <form className="login__create" onSubmit={handleRegister}>
                            <h1 className="login__title">Crear Cuenta</h1>

                            <div className="login__box">
                                <i className="bx bx-user login__icon"></i>
                                <input type="text" name="username" placeholder="Usuario" className="login__input" value={formData.username} onChange={handleChange} required />
                            </div>

                            <div className="login__box">
                                <i className="bx bx-at login__icon"></i>
                                <input type="email" name="email" placeholder="Email" className="login__input" value={formData.email} onChange={handleChange} required />
                            </div>

                            <div className="login__box">
                                <i className="bx bx-lock-alt login__icon"></i>
                                <input type="password" name="password" placeholder="Contraseña" className="login__input" value={formData.password} onChange={handleChange} required />
                            </div>

                            <button type="submit" className="login__button">
                                Registrarse
                            </button>

                            <div>
                                <span className="login__account">¿Ya tienes una cuenta?</span>
                                <span className="login__signup" onClick={() => setShowSignUp(false)}>
                                    Iniciar Sesión
                                </span>
                            </div>
                        </form>
                    ) : (
                        <form className="login__registre" onSubmit={handleLogin}>
                            <h1 className="login__title">Iniciar Sesión</h1>

                            <div className="login__box">
                                <i className="bx bx-user login__icon"></i>
                                <input type="text" name="username" placeholder="Usuario" className="login__input" value={formData.username} onChange={handleChange} required />
                            </div>

                            <div className="login__box">
                                <i className="bx bx-lock-alt login__icon"></i>
                                <input type="password" name="password" placeholder="Contraseña" className="login__input" value={formData.password} onChange={handleChange} required />
                            </div>

                            <Link className="login__forgot" to="#">
                                ¿Olvidaste tu contraseña?
                            </Link>

                            <button type="submit" className="login__button">
                                Entrar
                            </button>

                            <div>
                                <span className="login__account">¿No tienes una cuenta?</span>
                                <span className="login__signin" onClick={() => setShowSignUp(true)}>
                                    Registrarse
                                </span>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
