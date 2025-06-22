const express = require('express');
const router = express.Router();
const db = require('../db');

// REGISTRO
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  const sql = 'INSERT INTO Usuario (nombreUsuario, email, contrasenia) VALUES (?, ?, ?)';
  db.query(sql, [username, email, password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
      return res.status(500).json({ error: 'Error al registrar' });
    }
    res.status(201).json({ message: 'Usuario registrado correctamente' });
  });
});

// LOGIN
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  const sql = 'SELECT * FROM users WHERE nombreUsuario = ? AND contrasenia = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error en el servidor' });

    if (results.length > 0) {
      res.json({ message: 'Login exitoso', user: results[0] });
    } else {
      res.status(401).json({ error: 'Credenciales incorrectas' });
    }
  });
});

module.exports = router;
