// ================================================
//  Project Model — 3A Consulting Engineers
//  Fields: title, country, service, status, year, description
// ================================================

const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,       // allows multiple nulls (safe with seeds)
      lowercase: true,
      trim: true,
    },

    // ✅ Renamed from "location" → "country" to match Projects.jsx
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },

    // ✅ Renamed from "category" → "service" to match Projects.jsx
    service: {
      type: String,
      required: [true, "Service is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Completed", "Ongoing", "Planned"],
      default: "Completed",
    },

    year: {
      type: Number,
      required: [true, "Year is required"],
    },

    // ✅ Renamed from "excerpt" → "description" to match Projects.jsx
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [500, "Description cannot exceed 500 characters"],
    },

    // Optional extended body
    body: {
      type: String,
      default: "",
    },

    image: {
      type: String,
      default: null,
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
projectSchema.pre("save", function () {
  if (this.isModified("title") || !this.slug) {
    this.slug =
      this.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") +
      "-" +
      Date.now().toString().slice(-5);
  }
});

module.exports = mongoose.model("Project", projectSchema);