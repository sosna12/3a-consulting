// ================================================
//  Project Routes — /api/projects
// ================================================

const express = require("express");
const Project = require("../models/Project");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ================================================
//  GET /api/projects — Public
// ================================================
router.get("/", async (req, res) => {
  try {
    const { limit = 100, page = 1, country, service, status } = req.query;

    const filter = { published: true };
    if (country && country !== "All") filter.country = country;
    if (service && service !== "All") filter.service = service;
    if (status && status !== "All") filter.status = status;

    const projects = await Project.find(filter)
      .sort({ year: -1, createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Project.countDocuments(filter);

    res.json({ success: true, count: projects.length, total, page: Number(page), projects });
  } catch (error) {
    console.error("Get projects error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  GET /api/projects/:id — Public
// ================================================
router.get("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ success: true, project });
  } catch (error) {
    console.error("Get project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  POST /api/projects — Admin only
// ================================================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, country, service, status, year, description, body, image, published } = req.body;

if (!title || !country || !service || !year || !description) {
  return res.status(400).json({
    message: "Title, country, service, year, and description are required",
  });
}

const project = await Project.create({
  title,
  country,
  service,
  status: status || "Completed",
  year: Number(year),
  description,
  body: body || "",
  image: image || null,
  published: published !== undefined ? published : true,
});

    res.status(201).json({ success: true, project });
  } catch (error) {
    console.error("Create project error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================================================
//  PUT /api/projects/:id — Admin only
// ================================================
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ success: true, project });
  } catch (error) {
    console.error("Update project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  DELETE /api/projects/:id — Admin only
// ================================================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found" });
    res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Delete project error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;