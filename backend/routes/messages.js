// ================================================
//  Message Routes — /api/messages
//  Public: POST (submit contact form)
//  Admin:  GET, PUT (mark read/star), DELETE
// ================================================

const express = require("express");
const Message = require("../models/Message");
const { protect, adminOnly } = require("../middleware/auth");

const router = express.Router();

// ================================================
//  POST /api/messages — PUBLIC — submit form
// ================================================
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, company, service, subject, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({
        message: "Name, email, and message are required",
      });
    }

    // Simple spam check — honeypot field (hidden input on the form)
    // Real users won't fill it, bots will
    if (req.body.website) {
      return res.status(400).json({ message: "Spam detected" });
    }

    // Rate limit: reject if same email sent 5+ times in the last 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);
    const recent = await Message.countDocuments({
      email: email.toLowerCase(),
      createdAt: { $gte: tenMinutesAgo },
    });

    if (recent >= 5) {
      return res.status(429).json({
        message: "Too many messages. Please try again later.",
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: (phone || "").trim(),
      company: (company || "").trim(),
      service: service || "General Inquiry",
      subject: (subject || "").trim(),
      message: message.trim(),
      ipAddress: req.ip || "",
      userAgent: req.headers["user-agent"] || "",
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your message has been received. We'll respond shortly.",
      id: newMessage._id,
    });
  } catch (error) {
    console.error("Submit message error:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ================================================
//  GET /api/messages — ADMIN — list all
//  Query: ?read=false  ?starred=true  ?limit=50  ?page=1
// ================================================
router.get("/", protect, adminOnly, async (req, res) => {
  try {
    const { read, starred, limit = 100, page = 1 } = req.query;

    const filter = {};
    if (read === "true") filter.read = true;
    if (read === "false") filter.read = false;
    if (starred === "true") filter.starred = true;

    const messages = await Message.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Message.countDocuments(filter);
    const unread = await Message.countDocuments({ read: false });
    const starredCount = await Message.countDocuments({ starred: true });

    res.json({
      success: true,
      count: messages.length,
      total,
      unread,
      starred: starredCount,
      page: Number(page),
      messages,
    });
  } catch (error) {
    console.error("Get messages error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  GET /api/messages/stats — ADMIN — unread count only
//  (Fast, used for dashboard badge)
// ================================================
router.get("/stats", protect, adminOnly, async (req, res) => {
  try {
    const unread = await Message.countDocuments({ read: false });
    const total = await Message.countDocuments();
    const starred = await Message.countDocuments({ starred: true });
    res.json({ success: true, unread, total, starred });
  } catch (error) {
    console.error("Get stats error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  GET /api/messages/:id — ADMIN — single message
// ================================================
router.get("/:id", protect, adminOnly, async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    // Auto-mark as read on view
    if (!message.read) {
      message.read = true;
      await message.save();
    }

    res.json({ success: true, message });
  } catch (error) {
    console.error("Get message error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  PUT /api/messages/:id — ADMIN — toggle read/star
// ================================================
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const { read, starred } = req.body;
    const update = {};
    if (read !== undefined) update.read = read;
    if (starred !== undefined) update.starred = starred;

    const message = await Message.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.json({ success: true, message });
  } catch (error) {
    console.error("Update message error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// ================================================
//  DELETE /api/messages/:id — ADMIN
// ================================================
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error("Delete message error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;