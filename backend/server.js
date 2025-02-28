const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const app = express();

dotenv.config({ path: path.resolve(__dirname, "../.env") });
app.use(express.static(path.join(__dirname, 'frontend')));

const authRoutes = require("./routes/auth");
const db = require("./config/db");


app.use(cors());
app.use(express.json());

// API Route to Check Server
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});
app.get('/features/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'features', 'login.html'));
});

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

if (process.env.NODE_ENV === "development") {
    console.log("✅ ENV Loaded Successfully:");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASS:", process.env.DB_PASS ? "********" : "Not Set");
    console.log("DB_NAME:", process.env.DB_NAME);
}

const pool = require("./config/db");

pool.getConnection()
    .then(() => console.log("✅ Database Connected!"))
    .catch((err) => console.error("❌ Database Connection Error:", err));

