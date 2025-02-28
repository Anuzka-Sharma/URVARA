const jwt = require("jsonwebtoken");

const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        console.log("📩 Signup Request Received:", req.body);
        console.log("📌 Request Type:", typeof req.body); // Debugging

        const { username, password, mobile } = req.body;

        // ✅ Validate input
        if (!username || !password || !mobile) {
            console.error("❌ Missing fields in request:", { username, password, mobile });
            return res.status(400).json({ error: "Missing username, password, or mobile" });
        }

        // 🔒 Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 🛠 Insert into database
        const query = "INSERT INTO users (username, password, mobile) VALUES (?, ?, ?)";

        // ⏳ Execute query
        const [result] = await pool.query(query, [username, hashedPassword, mobile]);

        console.log("✅ User Registered:", result);
        res.status(201).json({ message: "User registered successfully!", userId: result.insertId });

    } catch (err) {
        console.error("❌ Signup Error:", err);

        // 🛑 Handle duplicate entry (MySQL error code: ER_DUP_ENTRY)
        if (err.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ error: "Username or mobile already exists!" });
        }

        res.status(500).json({ error: "Internal Server Error" });
    }
});

// 🔑 User Login Route
router.post("/login", async (req, res) => {
    const { mobile, password } = req.body;

    if (!mobile || !password) {
        return res.status(400).json({ error: "❌ मोबाइल और पासवर्ड ज़रूरी हैं!" });
    }

    try {
        const [rows] = await pool.query("SELECT * FROM users WHERE mobile = ?", [mobile]);

        if (rows.length === 0) {
            return res.status(401).json({ error: "❌ उपयोगकर्ता नहीं मिला!" });
        }

        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "❌ पासवर्ड गलत है!" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("❌ JWT_SECRET is not defined in .env file!");
            return res.status(500).json({ error: "❌ सर्वर त्रुटि! (JWT Secret Missing)" });
        }

        const token = jwt.sign(
            { id: user.id, mobile: user.mobile }, 
            process.env.JWT_SECRET, 
            { expiresIn: "1h" }
        );

        return res.json({ message: "✅ लॉगिन सफल!", token });
    } catch (error) {
        console.error("❌ Login Error:", error);
        return res.status(500).json({ error: "❌ सर्वर त्रुटि!" });
    }
});

module.exports = router;
