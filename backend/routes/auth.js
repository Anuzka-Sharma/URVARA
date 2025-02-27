const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController"); // Make sure this file exists

// User authentication routes
router.post("/login", authController.login);
router.post("/register", authController.register);

module.exports = router;
