const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// ✅ Signup API
const signup = async (req, res) => {
    try {
        const { username, password, mobile } = req.body;

        // Duplicate User Check
        const [existingUser] = await db.query("SELECT * FROM users WHERE username = ? OR mobile = ?", [username, mobile]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: "Username or Mobile already exists!" });
        }

        // Hash Password & Insert User
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query("INSERT INTO users (username, password, mobile) VALUES (?, ?, ?)",
            [username, hashedPassword, mobile]);

        res.json({ message: "User registered successfully!" });

    } catch (err) {
        console.error("❌ Error in Signup:", err);
        res.status(500).json({ error: "Signup Failed!" });
    }
};

// ✅ Login API
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const [user] = await db.query("SELECT * FROM users WHERE username = ?", [username]);

        if (user.length === 0) {
            return res.status(400).json({ error: "User not found!" });
        }

        // Password Match
        const isMatch = await bcrypt.compare(password, user[0].password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials!" });
        }

        // Generate Token
        const token = jwt.sign({ id: user[0].id, username: user[0].username }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "Login successful!", token });

    } catch (err) {
        console.error("❌ Error in Login:", err);
        res.status(500).json({ error: "Login Failed!" });
    }
};

module.exports = { signup, login };
