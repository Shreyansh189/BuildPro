import express from "express";
import Project from "../src/models/Project.js";

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
router.post("/", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    // Validation
    if (!name || !description || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const project = await Project.create({ name, description, imageUrl });
    res.status(201).json(project);
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(400).json({ message: "Invalid project data" });
  }
});

export default router;
