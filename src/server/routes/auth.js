require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Encriptar contraseña
        const hashed = await bcrypt.hash(password, 10);

        const sql = "INSERT INTO Usuario (nombreUsuario, email, contrasenia) VALUES (?, ?, ?)";
        db.query(sql, [username, email, hashed], (err, result) => {
            if (err) {
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "El usuario ya existe" });
                }
                return res.status(500).json({ error: "Error interno del servidor" });
            }

            res.status(201).json({ message: "Usuario registrado correctamente", user: username });
        });
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor" });
    }
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM Usuario WHERE nombreUsuario = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.contrasenia);

        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign({ id: user.idUsuario, username: user.nombreUsuario }, process.env.JWT_SECRET, { expiresIn: "4h" });

        res.json({
            message: "Login exitoso",
            token,
            expiresIn: 4 * 60 * 60, // 4 horas en segundos
            user: { id: user.idUsuario, username: user.nombreUsuario },
        });
    });
});

router.get("/profile", verifyToken, (req, res) => {
    res.json({
        message: `Bienvenido ${req.user.username}!`,
        userData: req.user,
    });
});

function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(403).json({ error: "Token no proporcionado" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido o expirado" });
        }
        req.user = user; // guardamos los datos del usuario en la request
        next();
    });
}

module.exports = router;
