const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const router = express.Router();

// ✅ Debugging Route
router.get("/", (req, res) => {
    res.json({ message: "✅ Auth API is working!" });
});

// 📝 SIGNUP API
router.post("/signup", async (req, res) => {
    try {
        console.log("Signup Request Received:", req.body);

        const { username, password, mobile } = req.body;
        if (!username || !password || !mobile) {
            return res.status(400).json({ error: "Missing username, password, or mobile" });
        }

        // 🔒 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (username, password, mobile) VALUES (?, ?, ?)",
            [username, hashedPassword, mobile]
        );

        res.status(201).json({ message: "User registered successfully!", userId: result.insertId });
    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 📝 LOGIN API
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const [rows] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = rows[0];
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.json({ message: "Login successful!", userId: user.id });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;