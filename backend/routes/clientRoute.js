import express from "express";
import Client from "../models/Client.js";

const router = express.Router();

// GET all clients (testimonials)
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new client (admin)
router.post("/", async (req, res) => {
  try {
    const { name, designation, description, imageUrl } = req.body;
    const client = await Client.create({
      name,
      designation,
      description,
      imageUrl,
    });
    res.status(201).json(client);
  } catch (err) {
    console.error("Error creating client:", err);
    res.status(400).json({ message: "Invalid client data" });
  }
});

export default router;
