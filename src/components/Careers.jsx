import React, { useEffect, useState } from "react";
import { fetchJobs } from "../api/jobs";
import careersHero from "../assets/road3.jpg"; // or use a URL

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchJobs({ status: "Open", limit: 100 });
        setJobs(data.jobs || []);
        setError("");
      } catch (err) {
        console.error("Failed to load jobs:", err);
        setError("Failed to load job openings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const formatDeadline = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="careers-page">

      {/* ============ HERO ============ */}
      <section
        className="careers-hero"
        style={{
          backgroundImage: `url(${careersHero})`,
        }}
      >
        <h1 className="careers-hero-title">CAREERS</h1>
      </section>

      {/* ============ JOBS LIST ============ */}
      <section className="careers-content">

        {loading && (
          <div className="careers-box">
            <p className="careers-empty">Loading job openings…</p>
          </div>
        )}

        {error && (
          <div className="careers-box">
            <p className="careers-empty" style={{ color: "#c53030" }}>
              {error}
            </p>
          </div>
        )}

        {!loading && !error && jobs.length === 0 && (
          <div className="careers-box">
            <p className="careers-empty">
              We currently have no job openings
            </p>
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <div className="careers-list">
            <h2 className="careers-list-title">
              Open Positions ({jobs.length})
            </h2>

            {jobs.map((job) => (
              <article key={job._id} className="careers-job">
                <div className="careers-job-head">
                  <h3>{job.title}</h3>
                  <span className={`job-status-badge ${job.status.toLowerCase()}`}>
                    {job.status}
                  </span>
                </div>

                <p className="careers-job-meta">
                  {job.department} · {job.type} · 📍 {job.location}
                  {job.experience && <> · {job.experience}</>}
                </p>

                <p className="careers-job-desc">{job.description}</p>

                {job.requirements && (
                  <details className="careers-details">
                    <summary>Requirements</summary>
                    <div className="careers-details-content">
                      {job.requirements.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </details>
                )}

                {job.responsibilities && (
                  <details className="careers-details">
                    <summary>Responsibilities</summary>
                    <div className="careers-details-content">
                      {job.responsibilities.split("\n").map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </details>
                )}

                {job.salary && (
                  <p className="careers-job-salary">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                )}

                {job.deadline && (
                  <p className="careers-job-deadline">
                    <strong>Apply before:</strong> {formatDeadline(job.deadline)}
                  </p>
                )}

                <div className="careers-job-actions">
                  {job.applyUrl ? (
                    <a
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="careers-apply-btn"
                    >
                      Apply Online
                    </a>
                  ) : (
                    <a
                      href={`mailto:${job.applyEmail}?subject=Application: ${job.title}`}
                      className="careers-apply-btn"
                    >
                      Apply by Email
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

      </section>
    </main>
  );
}