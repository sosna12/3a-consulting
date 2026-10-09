// ================================================
//  Message Model — 3A Consulting Engineers
//  Stores contact form submissions
// ================================================

const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // Sender info
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    company: {
      type: String,
      trim: true,
      default: "",
    },

    // Service they're interested in
    service: {
      type: String,
      default: "General Inquiry",
    },

    subject: {
      type: String,
      trim: true,
      maxlength: [200, "Subject cannot exceed 200 characters"],
      default: "",
    },

    // The actual message content
    message: {
      type: String,
      required: [true, "Message is required"],
      maxlength: [5000, "Message cannot exceed 5000 characters"],
    },

    // Admin state
    read: {
      type: Boolean,
      default: false,
    },

    starred: {
      type: Boolean,
      default: false,
    },

    // Metadata
    ipAddress: {
      type: String,
      default: "",
    },

    userAgent: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

// Index for sorting by newest
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);