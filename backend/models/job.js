// ================================================
//  Job Model — 3A Consulting Engineers
//  Represents a career opening at 3A
// ================================================

const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },

    slug: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    // Full-time, Part-time, Contract, Internship
    type: {
      type: String,
      enum: ["Full-time", "Part-time", "Contract", "Internship"],
      default: "Full-time",
    },

    // Department: Engineering, Design, Operations, Admin, etc.
    department: {
      type: String,
      trim: true,
      default: "Engineering",
    },

    // Location: "Addis Ababa, Ethiopia" or "Remote"
    location: {
      type: String,
      required: [true, "Location is required"],
      trim: true,
    },

    // Short summary shown on the careers page
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },

    // Detailed responsibilities + requirements
    responsibilities: {
      type: String,
      default: "",
    },

    requirements: {
      type: String,
      default: "",
    },

    // Experience level: "0-2 years", "3-5 years", "5+ years"
    experience: {
      type: String,
      default: "",
    },

    // Salary range (optional)
    salary: {
      type: String,
      default: "",
    },

    // Deadline for applications
    deadline: {
      type: Date,
      default: null,
    },

    // How to apply — email or link
    applyEmail: {
      type: String,
      default: "careers@3aconsulting.com",
    },

    applyUrl: {
      type: String,
      default: "",
    },

    // Open or closed
    status: {
      type: String,
      enum: ["Open", "Closed"],
      default: "Open",
    },

    // Public visibility
    published: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Auto-generate slug
jobSchema.pre("save", function () {
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

module.exports = mongoose.model("Job", jobSchema);