import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const connectionString = process.env.INTERNAL_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: connectionString && !connectionString.includes("localhost") ? { rejectUnauthorized: false } : false,
});

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL correctamente"))
    .catch((err) => console.error("❌ Error de conexión a PostgreSQL:", err));

export const query = (text, params) => pool.query(text, params);
export default pool;
