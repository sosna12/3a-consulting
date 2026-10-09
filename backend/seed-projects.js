// ================================================
//  SEED PROJECTS — Insert initial projects
//  Run:  node seed-projects.js
// ================================================

const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Project = require("./models/Project");
dotenv.config();

const initialProjects = [
  { title: "Addis Ababa International Airport – Phase 1", description: "Detailed design and construction supervision for runway, taxiway and apron expansion (ICAO Code 4E).", country: "Ethiopia", service: "Design Review & Construction Supervision", status: "Completed", year: 2019 },
  { title: "Modjo Green Logistic Hub – Demand Analysis & Detail Design", description: "Demand analysis and detailed engineering design for the Modjo Green Logistic Hub.", country: "Ethiopia", service: "Design", status: "Completed", year: 2021 },
  { title: "Kapoeta – Boma – Raad Road Project", description: "Feasibility studies, EIA, and detailed engineering design of Kapoeta-Boma-Raad Road.", country: "South Sudan", service: "Feasibility & EIA", status: "Completed", year: 2018 },
  { title: "Manzini – Mbadlane (MR3) Highway Project (Lot 1)", description: "Design review and construction supervision of the Manzini to Mbadlane Highway.", country: "Eswatini", service: "Design Review & Construction Supervision", status: "Completed", year: 2022 },
  { title: "Lira – Abim Road Upgrading Project", description: "Feasibility study and detailed engineering design for Lira–Abim Road.", country: "Uganda", service: "Design", status: "Ongoing", year: 2024 },
  { title: "Nebbi-Goli-Paidha-Zombo-Warr-Vura Road (119 km)", description: "Feasibility study and detailed engineering design for the Nebbi-Goli road corridor.", country: "Uganda", service: "Design", status: "Completed", year: 2020 },
  { title: "Gonder – Humera Road Project", description: "Review of the feasibility study, EIA, RAP, and detailed design.", country: "Ethiopia", service: "Design Review & Construction Supervision", status: "Completed", year: 2017 },
  { title: "Jinka Airport – Runway, Taxiway & Apron", description: "Detailed engineering design for the runway, taxiway, and apron at Jinka Airport.", country: "Ethiopia", service: "Design", status: "Completed", year: 2016 },
  { title: "Adama – Awash Expressway (125 km)", description: "Pre-feasibility, feasibility, EIA, RAP, and design for the Adama-Awash Expressway.", country: "Ethiopia", service: "Feasibility & EIA", status: "Completed", year: 2015 },
  { title: "Mbala – Nakonde Road Upgrading", description: "Detailed engineering design review and construction supervision (194 km).", country: "Zambia", service: "Design Review & Construction Supervision", status: "Ongoing", year: 2023 },
];

const generateSlug = (title, i) =>
  title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") +
  "-" +
  Date.now() +
  "-" +
  i;

const seedProjects = async () => {
  try {
    await connectDB();
    const deleted = await Project.deleteMany({});
    console.log(`🗑️  Deleted ${deleted.deletedCount} old projects`);

    const withSlugs = initialProjects.map((p, i) => ({
      ...p,
      slug: generateSlug(p.title, i),
    }));

    const inserted = await Project.insertMany(withSlugs);
    console.log(`✅ Inserted ${inserted.length} projects!`);
    inserted.forEach((p, i) => console.log(`   ${i + 1}. ${p.title}`));

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedProjects();