import React from "react";
import { Link } from "react-router-dom";
import ReportingBanner from "./ReportingBanner";
import hero from "../assets/hero.png";
import ambeshBridge from "../assets/Ambesh_Bridge.jpg";
import road from "../assets/road.png";
import roadsurfacing from "../assets/roadsurfacing.png";
import airports from "../assets/airports.png";
import water from "../assets/water.png";
import building from "../assets/building.png";
import background from "../assets/background.png";
import awoke from "../assets/3a.jpg";
import airport from "../assets/airport.jpg";
import airpo from "../assets/airpo.jpg";
import aaairplane from "../assets/aaairplane.jpg";
//import airports from "../assets/airports.png";
import road1 from "../assets/road1.jpg";
import road2 from "../assets/road2.jpg";
import road3 from "../assets/road3.jpg";
import road4 from "../assets/road4.jpg";
import road5 from "../assets/road5.jpg";
import progress from "../assets/progress.jpg";
import engineers from "../assets/engineers.jpg";

const airportGallery = [
  { src: airport, alt: "Addis Ababa International Airport project site" },
  { src: airports, alt: "Aerial view of airport infrastructure" },
  { src: airpo, alt: "Airport construction progress" },
  { src: aaairplane, alt: "Airport facilities and infrastructure" },
];

const tanzaniaRoadGallery = [
  { src: road1, alt: "Tanga to Saadani road project" },
  { src: road2, alt: "Tanzania road construction project" },
  { src: road3, alt: "Road infrastructure in Tanzania" },
  { src: road4, alt: "Tanzania road works" },
  { src: road5, alt: "Road upgrading works in Tanzania" },
];

function FloatingImageGallery({ images, label }) {
  return (
    <section className="floating-image-gallery" aria-label={label}>
      {images.map((image, index) => (
        <figure
          className="floating-image-card"
          key={image.alt}
          style={{
            animationDelay: `${index * -0.8}s`,
            animationDuration: `${4.5 + (index % 3) * 0.7}s`,
          }}
        >
          <img src={image.src} alt={image.alt} loading="lazy" />
          <figcaption className="floating-image-caption">{image.alt}</figcaption>
        </figure>
      ))}
    </section>
  );
}

export default function Home() {
  return (
    <main  className="home">

      {/* ============ 1. HERO ============ */}
      <section  className="hero" style={{ backgroundImage: `url(${background})` }}>
        <div className="hero-content">
            <h1>3A Consulting Engineers</h1>
          <h2>OVER 25 YEARS OF CONSTRUCTION EXPERIENCE</h2>
          <Link className="btn-login" to="/login">LOGIN</Link>
        </div>
      </section>

      <section className="ethiopia-feature" aria-labelledby="ethiopia-title">
        <div className="section-banner ethiopia-banner">
          <h2 id="ethiopia-title">3A IN ETHIOPIA</h2>
        </div>

        <div className="container ethiopia-project">
          <h2 className="project-title">ADDIS ABABA INTERNATIONAL AIRPORT</h2>

          <FloatingImageGallery
            images={airportGallery}
            label="Addis Ababa International Airport project images"
          />

          <div className="two-col text-block">
            <p>
              Lot 1: Package 1: Infrastructure involves the construction of a new
              ICAO Code 4E airport. The scope of work includes the construction of
              airside infrastructure: Runway, Apron, Taxiway C and D, and landside
              infrastructure: Access and service roads, car parks, fences, and gates.
              It also includes air navigation systems, water systems, and electrical
              system installations.
            </p>
            <p className="muted-caption">
              CONSULTANCY SERVICE FOR SUPERVISION OF CONSTRUCTION OF ADDIS ABABA
              INTERNATIONAL AIRPORT – PHASE 1: LOT 1: PACKAGE 1 – INFRASTRUCTURES AND
              PACKAGE 2 – BUILDINGS.
            </p>
          </div>

          <div className="two-col ethiopia-project-details">
            <img src={airpo} alt="Construction progress at Addis Ababa airport" />
            <img src={aaairplane} alt="Airport facilities and infrastructure" />
            <p className="muted-caption">Progress of airport construction.</p>
            <ul className="project-list">
              LOT 2: PACKAGE 2: The building projects involve construction of:
              <li>Passenger Terminal Building</li>
              <li>Air Traffic Control Tower</li>
              <li>Fire Station Building</li>
              <li>Power Station and Sub-Station Buildings</li>
              <li>MTO Building</li>
              <li>MEP Training</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* ============ 4. OTHER PROJECTS ============ */}
      <div className="container">
        <h2 className="section-heading">
          OTHER ROAD INFRASTRUCTURE PROJECTS IN TANZANIA
        </h2>

        <div className="two-col text-block">
          <p className="small-caps">
            CONSULTANCY SERVICE FOR CONSTRUCTION SUPERVISION OF UPGRADING OF
            TANGA – SAADANI – BAGAMOYO ROAD (256KM) TO BITUMEN STANDARD LOT-3:
            MKANGE – MKAWAJA – TUNGUAMAA ROAD SECTION (95.20KM) INCLUDING
            KIPUMBWI SPUR ROAD (3.7KM).
          </p>
          <p className="small-caps">
            CONSULTANCY SERVICE FOR CONSTRUCTION SUPERVISION OF UPGRADING OF
            KABINGO – KASULU – MANYOVU ROAD (260.6KM) TO BITUMEN STANDARD LOT-1:
            KASULU JUNCTION – MANYOVU INCLUDING KASULU TOWN LINKS (68.28KM).
          </p>
        </div>

        <FloatingImageGallery
          images={tanzaniaRoadGallery}
          label="Tanzania road infrastructure project images"
        />
      </div>

      <hr className="divider" />

      {/* ============ 5. PROGRESS IN UGANDA ============ */}
      <div className="section-banner">
        <h2>Progress in Uganda</h2>
      </div>

      <div className="container">
        <img src={progress} alt="Uganda road" className="full-width-img" />

        <div className="two-col text-block">
          <div>
            <p>
              The Government of Uganda allocated funds for the National Roads
              Development and Maintenance Programme (NRDMP). The finance for
              Design Review and Construction Supervision of the Upgrading of
              Luweero – Butalangu Road (29.72Km) was secured from the Arab Bank
              for Economic Development in Africa (BADEA) and OPEC Fund for
              International Development (OFID) as well as the Government of
              Uganda (GoU).
            </p>
            <p>
              Our company's main assignment's objective is to execute the
              physical construction of the project on behalf of the Uganda
              National Roads Authority (UNRA). The primary aim is to ensure that
              the project is completed on time, within budget, and in accordance
              with the required engineering specifications.
            </p>
          </div>
          <div>
            <img src={engineers} alt="Team" />
            <p className="caption">
              The OPEC Fund for International Development Announcement
            </p>
          </div>
        </div>
      </div>

      {/* ============ 6. ABOUT US ============ */}
      <section className="about-section">
        <div className="container two-col">
          <div>
            <h2>ABOUT US</h2>
            <p className="about-brand">3A Consulting Engineers Plc</p>
            <p>
              Founded with an initial focus on Highway Engineering, 3A Consulting
              Engineers has since been delivering groundbreaking consultancy
              services for projects which represent outstanding importance in
              Ethiopia's infrastructural development history — with a total
              project length of several hundred kilometres of roads, and has been
              undertaking numerous projects in other parts of Africa as well.
            </p>
            <p>
              3A is currently located in Ethiopia, and with branch offices in
              Kenya, Tanzania, Uganda, South Sudan, Zambia, Rwanda, and soon in
              other regions.
            </p>
          </div>
          <div>
            <img src={awoke} alt="About team" />
          </div>
        </div>
      </section>

      {/* ============ 7. WHAT MAKES US DIFFERENT ============ */}
      <section className="different-section">
        <div className="container">
          <h2>WHAT MAKES US DIFFERENT</h2>
          <p>
            3A Consulting Engineers is providing noteworthy multidisciplinary
            infrastructure Engineering services to government and private
            companies around the world — currently with branches and project
            sites located in Ethiopia, Kenya, Tanzania, Uganda, Rwanda, South
            Sudan, Zambia and beyond. We provide Consulting Services for
            projects financed by Local Banks, AfDB, World Bank, BADEA, World
            Food Program (UN) and Arab Banks — fostering sound and flexible
            responses to clients from feasibility study through construction
            supervision and Engineering Project Management, using a well-versed
            team of experts and up-to-date technologies.
          </p>
        </div>
      </section>

      {/* ============ 8. OUR BUSINESS ============ */}
      <section className="business-section">
        <div className="container">
          <h2 className="business-title">OUR BUSINESS</h2>
          <div className="business-grid">
            <div>
              <img src={road} alt="Road & Earth Works" />
              <p className="business-caption">ROAD &amp; EARTH WORKS</p>
            </div>
            <div>
              <img src={ambeshBridge} alt="Bridges" />
              <p className="business-caption">BRIDGES</p>
            </div>
            <div>
              <img src={roadsurfacing} alt="Road Surfacing" />
              <p className="business-caption">ROAD SURFACING</p>
            </div>
            <div>
              <img src={airports} alt="Airports" />
              <p className="business-caption">AIRPORTS</p>
            </div>
            <div>
              <img src={building} alt="Buildings" />
              <p className="business-caption">BUILDINGS</p>
            </div>
            <div>
              <img src={water} alt="Water Works" />
              <p className="business-caption">WATER INFRASTRUCTURE PROJECTS</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ 9. MAP / REPORTING ============ */}
         <section className="map-section">
        <div className="container">

          {/* Rotating messages */}
          <ReportingBanner />
           
           <p className="hero-text">

                     Reporting Channels <span className="typing"></span>

                </p>

          {/* Video globe */}
          <div className="map-wrap">
            <video
              className="map-video"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/globe.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Optional overlay label */}
            <div className="map-label">
              <strong>3A Consulting Engineers</strong>
              <br />
              - Ethiopia
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}