const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../.env") }); // ✅ Ensure .env is loaded

const authRoutes = require("./routes/auth"); // ✅ Correct Import
const db = require("./config/db"); // ✅ Database Connection

const app = express();

// ✅ Middleware Setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// ✅ Simple API Route to Check Server
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// ✅ Auth Routes Register
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Debugging ENV Variables
console.log("ENV LOADED ✅");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
