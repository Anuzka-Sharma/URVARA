const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const pool = require("./config/db");  // Database connection
const authRoutes = require("./routes/auth");  // Authentication routes

const app = express();
app.use(express.json()); // ✅ JSON Parsing Middleware

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, "frontend")));

app.use("/auth", authRoutes); // 🛠 Use the Auth Route

// Signup Route ✅ Fixed Duplicate Variable Issue
app.post("/auth/signup", (req, res) => {
    console.log("📩 Signup Request Received:", req.body);  // Debug request data
    console.log("📌 Request Type:", typeof req.body);  // Ensure it's an object
   // Ensure correct field names
   const username = req.body.name;  // 🔥 FIX: "username" ki jagah "name" use kiya
   const mobile = req.body.phone;   // 🔥 FIX: "mobile" ki jagah "phone" use kiya
   const password = req.body.password;

   // Debugging: Check received values
   console.log("🧐 Extracted Values ->", { username, mobile, password });

    if (!username || !mobile || !password) {
        return res.status(400).json({ error: "❌ Missing required fields!" });
    }

    res.json({ message: "🎉 Signup successful!" });
});

// API Route to Check Server
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// Serve Login Page
app.get("/features/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "features", "login.html"));
});

// Check Database Connection ✅ (Fixed)
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("✅ Database Connected!");
        connection.release();
    } catch (err) {
        console.error("❌ Database Connection Error:", err);
    }
})();

// Start Server ✅ (Fixed)
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// Debugging Environment Variables (Only in Development)
if (process.env.NODE_ENV === "development") {
    console.log("✅ ENV Loaded Successfully:");
    console.log("DB_HOST:", process.env.DB_HOST);
    console.log("DB_USER:", process.env.DB_USER);
    console.log("DB_PASS:", process.env.DB_PASS ? "********" : "Not Set");
    console.log("DB_NAME:", process.env.DB_NAME);
}
