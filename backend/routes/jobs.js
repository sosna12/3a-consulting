// ================================================
//  Job Routes — /api/jobs
//  Public: GET   |   Protected: POST/PUT/DELETE
// ================================================

const express = require("express");
const Job = require("../models/job");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ================================================
//  GET /api/jobs — Public — list all open jobs
//  Query: ?status=Open  ?department=Engineering
// ================================================
router.get("/", async (req, res) => {
  try {
    const { status, department, limit = 100, page = 1 } = req.query;

    const filter = { published: true };
    if (status && status !== "All") filter.status = status;
    if (department && department !== "All") filter.department = department;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Job.countDocuments(filter);

    res.json({
      success: true,
      count: jobs.length,
      total,
      page: Number(page),
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  GET /api/jobs/:id — Public — single job
// ================================================
router.get("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    console.error("Get job error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  POST /api/jobs — Admin — create
// ================================================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const {
      title, type, department, location, description,
      responsibilities, requirements, experience, salary,
      deadline, applyEmail, applyUrl, status, published,
    } = req.body;

    if (!title || !location || !description) {
      return res.status(400).json({
        message: "Title, location, and description are required",
      });
    }

    const job = await Job.create({
      title,
      type: type || "Full-time",
      department: department || "Engineering",
      location,
      description,
      responsibilities: responsibilities || "",
      requirements: requirements || "",
      experience: experience || "",
      salary: salary || "",
      deadline: deadline || null,
      applyEmail: applyEmail || "careers@3aconsulting.com",
      applyUrl: applyUrl || "",
      status: status || "Open",
      published: published !== undefined ? published : true,
    });

    res.status(201).json({ success: true, job });
  } catch (error) {
    console.error("Create job error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================================================
//  PUT /api/jobs/:id — Admin — update
// ================================================
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ success: true, job });
  } catch (error) {
    console.error("Update job error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  DELETE /api/jobs/:id — Admin — delete
// ================================================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json({ success: true, message: "Job deleted" });
  } catch (error) {
    console.error("Delete job error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;