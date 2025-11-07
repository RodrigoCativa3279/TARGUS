const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

const distPath = path.join(__dirname, "../../dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
