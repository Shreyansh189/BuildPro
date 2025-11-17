import express from "express";
import Subscriber from "../models/Subscriber.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all subscribers
router.get("/", authMiddleware, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    console.error("Error fetching subscribers:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST subscribe to newsletter
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Check if already subscribed
    const existingSubscriber = await Subscriber.findOne({ email });
    if (existingSubscriber) {
      return res.status(200).json({
        message: "You are already subscribed to our newsletter",
      });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({
      message: "Successfully subscribed to newsletter!",
      subscriber,
    });
  } catch (err) {
    console.error("Error subscribing:", err);
    res.status(400).json({ message: "Failed to subscribe" });
  }
});

export default router;
