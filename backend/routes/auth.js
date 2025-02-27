const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../config/db");

const router = express.Router();

// 📝 SIGNUP API
router.post("/signup", async (req, res) => {
    try {
        console.log("Signup Request Received:", req.body);

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        // 🔒 Hash password for security
        const hashedPassword = await bcrypt.hash(password, 10);

        const [result] = await pool.query(
            "INSERT INTO users (username, password) VALUES (?, ?)",
            [username, hashedPassword]
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
        console.log("Login Request Received:", req.body);

        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "Missing username or password" });
        }

        const [users] = await pool.query("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = users[0];
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        res.status(200).json({ message: "Login successful!", userId: user.id });
    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
