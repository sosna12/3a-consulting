// ================================================
//  Quick check — list all users in the DB
//  Run: node check-users.js
// ================================================

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
dotenv.config();

const checkUsers = async () => {
  await connectDB();

  const users = await User.find({});

  console.log(`\n📊 Total users in database: ${users.length}\n`);

  users.forEach((user, i) => {
    console.log(`--- User ${i + 1} ---`);
    console.log(`  ID:        ${user._id}`);
    console.log(`  Name:      ${user.name}`);
    console.log(`  Email:     ${user.email}`);
    console.log(`  Role:      ${user.role}`);
    console.log(`  Created:   ${user.createdAt}`);
    console.log("");
  });

  process.exit(0);
};

checkUsers();