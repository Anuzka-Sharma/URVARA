const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth"); // Auth Routes Import

const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes); // Auth Routes use karna

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
