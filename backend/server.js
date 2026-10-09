// ================================================
//  3A Consulting Engineers — Backend Server
//  Step 5: With auth routes
// ================================================

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env + connect DB
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------- Middleware ----------
app.use(cors());
app.use(express.json());

// ---------- Routes ----------
app.use("/api/auth", require("./routes/auth"));   // ✅ NEW
app.use("/api/news", require("./routes/News"));
app.use("/api/projects", require("./routes/projects")); 
app.use("/api/jobs", require("./routes/jobs"));
app.use("/api/messages", require("./routes/messages"));
app.use("/api/dashboard", require("./routes/dashboard"));


// ---------- Test routes ----------
app.get("/", (req, res) => {
  res.json({
    message: "3A Consulting Engineers API is running ✅",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "3A Consulting Backend",
    version: "0.1.0",
  });
});

// ---------- Start server ----------
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔐 Auth endpoints: http://localhost:${PORT}/api/auth`);
});