import express from "express";
import Contact from "../models/Contact.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all contact submissions
router.get("/", authMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new contact submission
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;

    // Validation
    if (!fullName || !email || !mobile || !city) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json({
      message: "Thank you! We will contact you soon.",
      contact,
    });
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(400).json({ message: "Failed to submit form" });
  }
});

export default router;
