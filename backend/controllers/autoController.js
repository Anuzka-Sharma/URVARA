const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
require("dotenv").config(); // ✅ Load environment variables

// Signup Function
const signup = async (req, res) => {
    const { username, password } = req.body;

    try {
        // ✅ Check if username already exists
        const [existingUser] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Username already taken!" });
        }

        // ✅ Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({ error: "Database error" });
    }
};

// Login Function
const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // ✅ Check if user exists
        const [users] = await db.execute("SELECT * FROM users WHERE username = ?", [username]);
        if (users.length === 0) return res.status(400).json({ error: "User not found" });

        const user = users[0];

        // ✅ Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // ✅ Generate JWT Token securely
        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Database error" });
    }
};

module.exports = { signup, login };
