import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

export default function Login() {
  const [showSignUp, setShowSignUp] = useState(false);

  // Estado para inputs
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Actualizar estado al escribir
  const handleChange = e => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  // Función para registrar usuario
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await res.json();
      alert(data.message || 'Registro exitoso');
    } catch (error) {
      alert('Error en el registro');
    }
  };

  // Función para login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        })
      });
      const data = await res.json();
      if (res.ok) {
        alert('Login exitoso');
        console.log('Usuario:', data.user);
      } else {
        alert(data.error || 'Credenciales inválidas');
      }
    } catch (error) {
      alert('Error en el login');
    }
  };

  return (
    <div className="login">
      <div className="login__content">
        <div className="login__img">
          <img src="/assets/login.svg" alt="Login Visual" />
        </div>

        <div className="login__forms">
          {showSignUp ? (
            <form className="login__create" onSubmit={handleRegister}>
              <h1 className="login__title">Crear Cuenta</h1>

              <div className="login__box">
                <i className="bx bx-user login__icon"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Usuario"
                  className="login__input"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login__box">
                <i className="bx bx-at login__icon"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="login__input"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login__box">
                <i className="bx bx-lock-alt login__icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="login__input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="login__button">Registrarse</button>

              <div>
                <span className="login__account">Ya tienes una cuenta?</span>
                <span className="login__signup" onClick={() => setShowSignUp(false)}>Iniciar Sesion</span>
              </div>

              <div className="login__social">
                <a href="#" className="login__social_icon"><i className='bx bxl-facebook'></i></a>
                <a href="#" className="login__social_icon"><i className='bx bxl-twitter'></i></a>
                <a href="#" className="login__social_icon"><i className='bx bxl-google'></i></a>
              </div>
            </form>
          ) : (
            <form className="login__registre" onSubmit={handleLogin}>
              <h1 className="login__title">Iniciar Sesion</h1>

              <div className="login__box">
                <i className="bx bx-user login__icon"></i>
                <input
                  type="text"
                  name="username"
                  placeholder="Usuario"
                  className="login__input"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="login__box">
                <i className="bx bx-lock-alt login__icon"></i>
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  className="login__input"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <Link className="login__forgot" to="#">Olvidaste tu contraseña?</Link>

              <button type="submit" className="login__button">Sign In</button>

              <div>
                <span className="login__account">No tienes una cuenta?</span>
                <span className="login__signin" onClick={() => setShowSignUp(true)}>Registrarse</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
