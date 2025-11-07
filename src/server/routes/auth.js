require("dotenv").config();
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// REGISTRO DE USUARIO
// =====================
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);

        const sql = `
            INSERT INTO usuario 
            (nombre_usuario, email, password, monedas, musica_activa, volumen_musica, modo_oscuro, idioma)
            VALUES ($1, $2, $3, 0, true, 50, false, 'es')
            RETURNING id_usuario, nombre_usuario, email
        `;

        console.log("🟡 Intentando registrar usuario:", username, email);

        const result = await db.query(sql, [username, email, hashed]);

        console.log("✅ Registro insertado con éxito:", result.rows[0]);
        res.status(201).json({
            message: "Usuario registrado correctamente",
            user: result.rows[0],
        });
    } catch (err) {
        console.error("❌ Error al registrar usuario:", err);

        // Código de error para duplicados en PostgreSQL
        if (err.code === "23505") {
            return res.status(400).json({ error: "El usuario o email ya existen" });
        }

        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// =====================
// LOGIN
// =====================
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const sql = "SELECT * FROM usuario WHERE nombre_usuario = $1";
        const result = await db.query(sql, [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const user = result.rows[0];
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
                musica_activa: user.musica_activa,
                volumen_musica: user.volumen_musica,
                modo_oscuro: user.modo_oscuro,
                idioma: user.idioma,
            },
        });
    } catch (err) {
        console.error("❌ Error en /login:", err);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

// =====================
// PERFIL (requiere token)
// =====================
router.get("/profile", verifyToken, async (req, res) => {
    const { id_usuario } = req.user;

    try {
        const sql = `
            SELECT id_usuario, nombre_usuario, email, monedas, musica_activa, volumen_musica, modo_oscuro, idioma 
            FROM usuario 
            WHERE id_usuario = $1
        `;
        const result = await db.query(sql, [id_usuario]);

        if (result.rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

        res.json({
            message: `Bienvenido ${result.rows[0].nombre_usuario}!`,
            userData: result.rows[0],
        });
    } catch (err) {
        console.error("❌ Error en /profile:", err);
        res.status(500).json({ error: "Error al obtener perfil" });
    }
});

// =====================
// VERIFICAR TOKEN
// =====================
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
