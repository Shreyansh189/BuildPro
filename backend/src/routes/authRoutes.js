import express from "express";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const getCredentials = () => {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.warn("ADMIN_EMAIL or ADMIN_PASSWORD is not set in environment variables.");
  }

  return { email, password };
};

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const creds = getCredentials();

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  if (email !== creds.email || password !== creds.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    token,
    user: {
      email,
      role: "admin",
    },
  });
});

router.get("/me", authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;

