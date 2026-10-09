// ================================================
//  News Routes — /api/news
//  Public: GET (read)
//  Protected: POST/PUT/DELETE (admin only)
// ================================================

const express = require("express");
const News = require("../models/News");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ================================================
//  GET /api/news — Public — list all published posts
// ================================================
router.get("/", async (req, res) => {
  try {
    const { limit = 50, page = 1 } = req.query;

    const posts = await News.find({ published: true })
      .populate("author", "name email")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await News.countDocuments({ published: true });

    res.json({
      success: true,
      count: posts.length,
      total,
      page: Number(page),
      posts,
    });
  } catch (error) {
    console.error("Get news error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  GET /api/news/:id — Public — single post
// ================================================
router.get("/:id", async (req, res) => {
  try {
    const post = await News.findById(req.params.id).populate(
      "author",
      "name email"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ success: true, post });
  } catch (error) {
    console.error("Get post error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  POST /api/news — Admin only — create post
// ================================================
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const { title, excerpt, body, category, image, published } = req.body;

    if (!title || !excerpt || !body) {
      return res
        .status(400)
        .json({ message: "Title, excerpt, and body are required" });
    }

    const post = await News.create({
      title,
      excerpt,
      body,
      category: category || "NEWS",
      image: image || null,
      published: published !== undefined ? published : true,
      author: req.user._id,   // from JWT
    });

    await post.populate("author", "name email");

    res.status(201).json({ success: true, post });
  } catch (error) {
    console.error("Create news error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================================================
//  PUT /api/news/:id — Admin only — update post
// ================================================
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const post = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate("author", "name email");

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ success: true, post });
  } catch (error) {
    console.error("Update news error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  DELETE /api/news/:id — Admin only — delete post
// ================================================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const post = await News.findByIdAndDelete(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json({ success: true, message: "Post deleted" });
  } catch (error) {
    console.error("Delete news error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;