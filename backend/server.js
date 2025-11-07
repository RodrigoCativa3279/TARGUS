import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

// Middleware
app.use(express.json());

// CORS: permitir desarrollo local y dominio de Render si se sirve separado
const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
    process.env.RENDER_EXTERNAL_URL,
].filter(Boolean);

app.use(
    cors({
        origin: (origin, callback) => {
            // Permitir solicitudes sin origin (same-origin o cURL)
            if (!origin) return callback(null, true);

            // Permitir orígenes explícitos
            if (allowedOrigins.includes(origin)) return callback(null, true);

            // Permitir cualquier localhost/127.0.0.1 en cualquier puerto
            if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
                return callback(null, true);
            }

            // Permitir dominios *.onrender.com
            try {
                const { hostname } = new URL(origin);
                if (hostname.endsWith(".onrender.com")) return callback(null, true);
            } catch (_) {}

            return callback(new Error("CORS bloqueado para este origen"));
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Rutas del backend
app.use("/api/auth", authRoutes);

// Healthcheck para Render
app.get("/healthz", (_req, res) => {
    res.status(200).send("OK");
});

// Servir frontend compilado (si está presente)
const distPath = path.resolve(__dirname, "../frontend/dist");
app.use(express.static(distPath));
app.get("/*", (_, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
