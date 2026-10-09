// ================================================
//  Dashboard Routes — /api/dashboard
//  Aggregated stats for the admin dashboard
// ================================================

const express = require("express");
const News = require("../models/News");
const Project = require("../models/Project");
const Job = require("../models/job");
const Message = require("../models/Message");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ================================================
//  GET /api/dashboard/stats — ADMIN
//  Returns counts for all resources
// ================================================
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const [
      newsCount,
      projectCount,
      jobCount,
      messageCount,
      unreadCount,
      starredCount,
      recentNews,
      recentProjects,
      recentJobs,
      recentMessages,
    ] = await Promise.all([
      News.countDocuments(),
      Project.countDocuments(),
      Job.countDocuments(),
      Message.countDocuments(),
      Message.countDocuments({ read: false }),
      Message.countDocuments({ starred: true }),
      News.find().sort({ createdAt: -1 }).limit(3).select("title createdAt"),
      Project.find().sort({ createdAt: -1 }).limit(3).select("title createdAt"),
      Job.find().sort({ createdAt: -1 }).limit(3).select("title createdAt"),
      Message.find()
        .sort({ createdAt: -1 })
        .limit(3)
        .select("name subject service read createdAt"),
    ]);

    res.json({
      success: true,
      counts: {
        news: newsCount,
        projects: projectCount,
        jobs: jobCount,
        messages: messageCount,
        unread: unreadCount,
        starred: starredCount,
      },
      recent: {
        news: recentNews,
        projects: recentProjects,
        jobs: recentJobs,
        messages: recentMessages,
      },
    });
  } catch (error) {
    console.error("Dashboard stats error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;