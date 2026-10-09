// ================================================
//  SEED NEWS — Insert initial news posts
//  Run:  node seed-news.js
// ================================================

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./models/User");
const News = require("./models/News");
dotenv.config();

const initialNews = [
  {
    title: "3A Consulting Engineers Recognized as Best Performer",
    category: "NEWS",
    excerpt: "Celebration Time 🏆 This First Category Award is a testament to the hard work, dedication, and expertise each and every one of our team brings to the table every day. 🏆",
    body: "Celebration Time 🏆\n\nThis First Category Award is a testament to the hard work, dedication, and expertise each and every one of our team brings to the table every day.",
    image: null,
    published: true,
  },
  {
    title: "Project Update: Building a Better Future with the Addis–Adama Expressway",
    category: "NEWS",
    excerpt: "Welcome to our project newsletter! We're excited to share insights into the detailed planning and engineering behind the Addis–Adama Expressway Project.",
    body: "Welcome to our project newsletter!\n\nWe're excited to share insights into the detailed planning and engineering behind the Addis–Adama Expressway Project.",
    image: null,
    published: true,
  },
  {
    title: "Progress in Oromia Region",
    category: "NEWS",
    excerpt: "Upgrading of the Ambo–Woliso Road (32.5 Km) from Gravel to Class II Paved (Bitumen) Standard.",
    body: "Upgrading of the Ambo–Woliso Road (32.5 Km) from Gravel to Class II Paved (Bitumen) Standard.\n\nThe Government of Ethiopia allocated funds for the National Roads Development and Maintenance Programme (NRDMP).",
    image: null,
    published: true,
  },
  {
    title: "Project Insights: The Ambesh–Gachit Road Development",
    category: "NEWS",
    excerpt: "Bringing Connectivity and Economic Growth to the Region — We're excited to share an overview of the Ambesh–Gachit Road Project.",
    body: "Bringing Connectivity and Economic Growth to the Region.\n\nWe're excited to share an overview of the Ambesh–Gachit Road Project.",
    image: null,
    published: true,
  },
  {
    title: "Official Announcement",
    category: "NEWS",
    excerpt: "3A Consulting Engineers — Reinstated for AfDB Projects. Official Announcement.",
    body: "3A Consulting Engineers — Reinstated for AfDB Projects.\n\n3A Engineering Consulting reinstated by the African Development Bank Group.",
    image: null,
    published: true,
  },
  {
    title: "Uganda Consultancy Service",
    category: "NEWS",
    excerpt: "Consultancy Service of Detail Engineering Design for the Lira–Ambi Road Upgrade Project.",
    body: "Consultancy Service of Detail Engineering Design for the Lira–Ambi Road Upgrade Project.\n\nOur team is on-site delivering comprehensive design and supervision services.",
    image: null,
    published: true,
  },
  {
    title: "Shosha–Goma Road Project: Engineering Insights & Updates",
    category: "NEWS",
    excerpt: "Welcome to our project update newsletter! We're excited to share key insights from the detailed engineering design.",
    body: "Welcome to our project update newsletter!\n\nWe're excited to share key insights from the detailed engineering design and cost estimation.",
    image: null,
    published: true,
  },
  {
    title: "Project Update: Paving the Way for Progress on the Shewa–Bench–Mazi Road",
    category: "NEWS",
    excerpt: "Welcome to our project newsletter! We're excited to share key insights and progress updates.",
    body: "Welcome to our project newsletter!\n\nWe're excited to share key insights and progress updates on the Shewa–Bench–Mazi Road Project.",
    image: null,
    published: true,
  },
];

const seedNews = async () => {
  try {
    await connectDB();

    const admin = await User.findOne({ role: "admin" });
    if (!admin) {
      console.error("❌ No admin user found. Run `node seed.js` first.");
      process.exit(1);
    }

    console.log(`👤 Author: ${admin.name} <${admin.email}>`);

    // ✅ Wipe existing news to avoid duplicates
    const deleted = await News.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} old posts`);

 const newsWithAuthor = initialNews.map((item, i) => ({
  ...item,
  author: admin._id,
  // ✅ Generate slug manually since insertMany skips pre-save hooks
  slug:
    item.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") +
    "-" +
    Date.now() +
    "-" +
    i,
}));

const inserted = await News.insertMany(newsWithAuthor);

    console.log(`✅ Inserted ${inserted.length} news posts!`);
    inserted.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedNews();