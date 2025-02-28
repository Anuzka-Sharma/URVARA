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

module.exports = router;
