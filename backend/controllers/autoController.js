const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const users = []; // Temporary database (Baad mein DB se replace karenge)

// Signup Logic
exports.signup = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.json({ message: "User registered successfully!" });
};

// Login Logic
exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(400).json({ error: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = jwt.sign({ username }, "secret_key", { expiresIn: "1h" });
  res.json({ message: "Login successful!", token });
};
