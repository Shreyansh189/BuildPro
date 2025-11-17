import express from "express";
import fs from "fs/promises";
import multer from "multer";
import Client from "../models/Client.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage } from "../utils/cloudinary.js";

const upload = multer({ dest: "tmp/uploads" });

const router = express.Router();

// GET all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    console.error("Error fetching clients:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new client
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const { name, designation, description, imageUrl: imageUrlFromBody } = req.body;

    // Validation
    if (!name || !designation || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = imageUrlFromBody;
    const filePath = req.file?.path;
    if (!imageUrl && filePath) {
      try {
        imageUrl = await uploadImage(filePath, { folder: "flipr/clients" });
      } finally {
        await fs.unlink(filePath).catch(() => {});
      }
    } else if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

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
