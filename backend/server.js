const express = require("express");
require("dotenv").config();
const db = require("./config/db"); // ✅ Correct Import

const app = express();
app.use(express.json());

// ✅ Simple API Route to Test Server
app.get("/", (req, res) => {
  res.send("🚀 Server is running!");
});

// ✅ Check Database Connectivity via API
app.get("/db-check", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1"); // Simple Query to Check DB
    res.json({ message: "✅ Database is connected!" });
  } catch (err) {
    res.status(500).json({ error: "❌ Database connection failed!" });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
require("dotenv").config();
console.log("ENV LOADED ✅");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASS:", process.env.DB_PASS);
console.log("DB_NAME:", process.env.DB_NAME);
