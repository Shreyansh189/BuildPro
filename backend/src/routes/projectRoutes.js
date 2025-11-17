import express from "express";
import fs from "fs/promises";
import multer from "multer";
import Project from "../models/Project.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadImage } from "../utils/cloudinary.js";

const upload = multer({ dest: "tmp/uploads" });

const router = express.Router();

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST create a new project
router.post("/", authMiddleware, upload.single("image"), async (req, res) => {
  try {
    const {
      name,
      description,
      imageUrl: imageUrlFromBody,
      location,
      category,
      timeline,
      services,
    } = req.body;

    // Validation
    if (!name || !description || !location) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let imageUrl = imageUrlFromBody;
    const filePath = req.file?.path;
    if (!imageUrl && filePath) {
      try {
        imageUrl = await uploadImage(filePath);
      } finally {
        await fs.unlink(filePath).catch(() => {});
      }
    } else if (filePath) {
      await fs.unlink(filePath).catch(() => {});
    }

    if (!imageUrl) {
      return res.status(400).json({ message: "Image is required" });
    }

    const project = await Project.create({
      name,
      description,
      imageUrl,
      location,
      category,
      timeline,
      services,
    });
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ message: "Invalid project data" });
  }
});

export default router;
