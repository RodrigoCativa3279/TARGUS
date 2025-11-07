const { Pool } = require("pg");
require("dotenv").config();

const connectionString = process.env.INTERNAL_DATABASE_URL || process.env.DATABASE_URL;

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect()
    .then(() => console.log("✅ Conectado a PostgreSQL correctamente"))
    .catch((err) => console.error("❌ Error de conexión a PostgreSQL:", err));

module.exports = pool;
