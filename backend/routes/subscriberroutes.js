import express from "express";
import Subscriber from "../models/Subscriber.js";

const router = express.Router();

// POST subscribe (from landing page)
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res
        .status(200)
        .json({ message: "Already subscribed", subscriber: existing });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ message: "Subscribed successfully", subscriber });
  } catch (err) {
    console.error("Error creating subscriber:", err);
    res.status(400).json({ message: "Invalid subscriber data" });
  }
});

// GET all subscribers (admin table)
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
