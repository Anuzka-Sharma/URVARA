const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// ✅ Load environment variables correctly
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const authRoutes = require("./routes/auth"); // ✅ Ensure auth routes are correctly imported
const db = require("./config/db"); // ✅ Ensure database connection

const app = express();

// ✅ Middleware Setup
app.use(cors()); // Enable CORS
app.use(express.json()); // Enable JSON parsing

// ✅ API Route to Check Server
app.get("/", (req, res) => {
    res.send("🚀 Server is running!");
});

// ✅ Register Auth Routes (Consistent Prefix)
app.use("/auth", authRoutes); // Use either `/auth` or `/api/auth`, not both!

const PORT = process.env.PORT || 8080;

// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Debugging ENV Variables (Only in Development Mode)
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
