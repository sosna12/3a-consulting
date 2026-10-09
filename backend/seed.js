// ================================================
//  SEED SCRIPT — Create Awoke's Admin Account
//  Run once:  node seed.js
// ================================================

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    // ============ ADMIN CREDENTIALS ============
    // 👇 CHANGE THESE to Awoke's real details
    const adminData = {
      name: "Awoke Aya Azen",
      email: "awokeayaazene@gmail.com",       // ← replace with real email
      password: "awokeayaazene2026",              // ← replace with a strong password
      role: "admin",
    };

    // Check if user already exists
    const existing = await User.findOne({ email: adminData.email });

    if (existing) {
      console.log("⚠️  User already exists:");
      console.log(`   Email: ${existing.email}`);
      console.log(`   Role:  ${existing.role}`);
      console.log("   Nothing to do. Exiting.");
      process.exit(0);
    }

    // Create the user — password is hashed automatically by the pre-save hook
    const user = await User.create(adminData);

    console.log("✅ Admin user created successfully!");
    console.log(`   Name:  ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Role:  ${user.role}`);
    console.log(`   ID:    ${user._id}`);
    console.log("");
    console.log("🔐 Save these credentials safely — you'll need them to log in.");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding admin:", error.message);
    process.exit(1);
  }
};

seedAdmin();