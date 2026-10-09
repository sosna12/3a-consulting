import React from "react";
import ReportingBanner from "./ReportingBanner";
import aboutHero from "../assets/vision.png";
import missionImage from "../assets/team.png";
import visionImage from "../assets/road1.jpg";

export default function About() {
  return (
    <main className="about-page">
      <section
        className="about-hero"
        aria-labelledby="about-hero-title"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${aboutHero})`,
        }}
      >
        <h1 id="about-hero-title">WHO ARE WE?</h1>
      </section>

      <section className="about-values" aria-label="Our mission and vision">
        <div className="about-value-row">
          <div className="about-value-image">
            <img
              src={missionImage}
              alt="Engineers reviewing plans at a construction site"
            />
          </div>
          <div className="about-value-copy">
            <h2>OUR MISSION</h2>
            <p>
              To deliver dependable engineering consultancy that supports
              sustainable development in Ethiopia and across the region.
            </p>
            <p>
              Our experienced team combines thoughtful design, careful
              supervision, and practical use of technology to help clients
              create infrastructure with lasting value for their communities.
            </p>
          </div>
        </div>

        <div className="about-value-row about-value-row-reverse">
          <div className="about-value-copy">
            <h2>OUR VISION</h2>
            <p>
              To be a leading engineering consultancy in the Horn of Africa,
              trusted for the quality and integrity of our work.
            </p>
            <p>
              We aim to anticipate our clients' needs and deliver professional,
              innovative solutions that meet the highest standards on every
              project.
            </p>
          </div>
          <div className="about-value-image">
            <img
              src={visionImage}
              alt="Construction equipment working on a road project"
            />
          </div>
        </div>
      </section>

      <ReportingBanner />
    </main>
  );
}
