import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// POST new contact (from landing page form)
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    const contact = await Contact.create({ fullName, email, mobile, city });
    res
      .status(201)
      .json({ message: "Contact submitted successfully", contact });
  } catch (err) {
    console.error("Error creating contact:", err);
    res.status(400).json({ message: "Invalid contact data" });
  }
});

// GET all contacts (for admin table)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    console.error("Error fetching contacts:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
