require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTRO DE USUARIO
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuario 
            (nombre_usuario, email, password, monedas, musica_activa, volumen_musica, modo_oscuro, idioma)
            VALUES (?, ?, ?, 0, 1, 50, 0, 'es')
        `;

        console.log("🟡 Intentando registrar usuario:", username, email);

        db.query(sql, [username, email, hashed], (err, result) => {
            if (err) {
                console.error("❌ Error al registrar usuario:", err);
                if (err.code === "ER_DUP_ENTRY") {
                    return res.status(400).json({ error: "El usuario o email ya existen" });
                }
                return res.status(500).json({ error: "Error interno del servidor" });
            }

            console.log("✅ Registro insertado con éxito:", result);
            res.status(201).json({ message: "Usuario registrado correctamente", user: { username, email } });
        });
    } catch (error) {
        console.error("❌ Error general en /register:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

// LOGIN
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM usuario WHERE nombre_usuario = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json({ error: "Error interno del servidor" });

        if (results.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const user = results[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        // Generar token JWT
        const token = jwt.sign(
            {
                id_usuario: user.id_usuario,
                username: user.nombre_usuario,
                email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: "4h" }
        );

        res.json({
            message: "Login exitoso",
            token,
            expiresIn: 4 * 60 * 60, // 4 horas
            user: {
                id: user.id_usuario,
                username: user.nombre_usuario,
                monedas: user.monedas,
                musica_activa: !!user.musica_activa,
                volumen_musica: user.volumen_musica,
                modo_oscuro: !!user.modo_oscuro,
                idioma: user.idioma,
            },
        });
    });
});

// PERFIL (requiere token)
router.get("/profile", verifyToken, (req, res) => {
    const { id_usuario } = req.user;

    const sql = "SELECT id_usuario, nombre_usuario, email, monedas, musica_activa, volumen_musica, modo_oscuro, idioma FROM usuario WHERE id_usuario = ?";
    db.query(sql, [id_usuario], (err, results) => {
        if (err) return res.status(500).json({ error: "Error al obtener perfil" });
        if (results.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({
            message: `Bienvenido ${results[0].nombre_usuario}!`,
            userData: results[0],
        });
    });
});

// FUNCION PARA VERIFICAR TOKEN
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
        req.user = user;
        next();
    });
}

module.exports = router;
