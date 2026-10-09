import React, { useEffect, useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fetchProjects } from "../api/projects";

const chartColors = [
  "#f5a623", "#0d4b79", "#188f89", "#728b39",
  "#a75e3a", "#626d9b", "#bc7e17",
];

const countBy = (projects, key) => {
  const counts = new Map();
  projects.forEach((p) => {
    const v = p[key];
    counts.set(v, (counts.get(v) || 0) + 1);
  });
  return Array.from(counts, ([name, value]) => ({ name, value }));
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedProject, setSelectedProject] = useState(null);

  // ============ LOAD FROM BACKEND ============
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchProjects({ limit: 200 });
        setProjectsData(data.projects || []);
        setError("");
      } catch (err) {
        console.error("Failed to load projects:", err);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // ============ FILTER LISTS ============
  const countries = useMemo(
    () => ["All Countries", ...new Set(projectsData.map((p) => p.country))],
    [projectsData]
  );
  const services = useMemo(
    () => ["All Services", ...new Set(projectsData.map((p) => p.service))],
    [projectsData]
  );
  const statuses = useMemo(
    () => ["All Statuses", ...new Set(projectsData.map((p) => p.status))],
    [projectsData]
  );

  // ============ FILTERED PROJECTS ============
  const filteredProjects = useMemo(
    () =>
      projectsData.filter(
        (p) =>
          (selectedCountry === "All Countries" || p.country === selectedCountry) &&
          (selectedService === "All Services" || p.service === selectedService) &&
          (selectedStatus === "All Statuses" || p.status === selectedStatus)
      ),
    [projectsData, selectedCountry, selectedService, selectedStatus]
  );

  // ============ CHART DATA ============
  const countryData = useMemo(() => countBy(projectsData, "country"), [projectsData]);
  const serviceData = useMemo(() => countBy(projectsData, "service"), [projectsData]);
  const timelineData = useMemo(() => {
    return Array.from(
      projectsData.reduce((counts, p) => {
        counts.set(p.year, (counts.get(p.year) || 0) + 1);
        return counts;
      }, new Map()),
      ([year, count]) => ({ year, count })
    ).sort((a, b) => a.year - b.year);
  }, [projectsData]);

  // ============ STATS ============
  const stats = [
    { label: "Projects documented", value: projectsData.length },
    { label: "Countries served", value: new Set(projectsData.map((p) => p.country)).size },
    { label: "Ongoing projects", value: projectsData.filter((p) => p.status === "Ongoing").length },
    { label: "Completed projects", value: projectsData.filter((p) => p.status === "Completed").length },
  ];

  const resetFilters = () => {
    setSelectedCountry("All Countries");
    setSelectedService("All Services");
    setSelectedStatus("All Statuses");
  };

  // ============ LOADING / ERROR ============
  if (loading) {
    return (
      <main className="projects-page">
        <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#777" }}>
          Loading projects…
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="projects-page">
        <div style={{ textAlign: "center", padding: "100px 20px", fontSize: "18px", color: "#c53030" }}>
          {error}
        </div>
      </main>
    );
  }

  return (
    <main className="projects-page">
      <section className="projects-intro" aria-labelledby="projects-title">
        <div className="projects-intro-inner">
          <p className="projects-page-label">Projects</p>
          <div className="projects-intro-copy">
            <h1 id="projects-title">3A Consulting Engineers Plc.</h1>
            <p>
              Explore our multidisciplinary engineering consultancy portfolio
              across Ethiopia and Eastern Africa.
            </p>
          </div>
        </div>
      </section>

      <div className="projects-content">
        {/* ============ STATS ============ */}
        <section className="project-stats" aria-label="Project portfolio summary">
          <h2 className="project-stats-title">Portfolio at a Glance</h2>
          {stats.map((stat) => (
            <article className="project-stat" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        {/* ============ CHARTS ============ */}
        <section className="project-charts" aria-label="Project portfolio charts">
          <article className="project-panel">
            <h2>Projects by country</h2>
            <p className="project-panel-hint">Select a segment to filter the projects.</p>
            <div className="project-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={countryData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="72%"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    onClick={(entry) =>
                      setSelectedCountry((curr) =>
                        curr === entry.name ? "All Countries" : entry.name
                      )
                    }
                    style={{ cursor: "pointer" }}
                  >
                    {countryData.map((entry, i) => (
                      <Cell key={entry.name} fill={chartColors[i % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="project-panel">
            <h2>Projects by service</h2>
            <div className="project-chart">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={serviceData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius="42%"
                    outerRadius="70%"
                  >
                    {serviceData.map((entry, i) => (
                      <Cell key={entry.name} fill={chartColors[i % chartColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="project-panel project-timeline" aria-labelledby="timeline-title">
          <h2 id="timeline-title">Project timeline</h2>
          <p className="project-panel-hint">Documented project start years.</p>
          <div className="project-chart project-chart-wide">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData} margin={{ top: 12, right: 16, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="#e8e8e8" strokeDasharray="4 4" />
                <XAxis dataKey="year" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="count"
                  name="Projects"
                  stroke="#0d4b79"
                  fill="#f5a623"
                  fillOpacity={0.24}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* ============ FILTERS ============ */}
        <section className="project-portfolio" aria-labelledby="portfolio-title">
          <div className="project-portfolio-heading">
            <div>
              <p className="projects-eyebrow">Explore our work</p>
              <h2 id="portfolio-title">Project portfolio</h2>
            </div>
            <span className="project-result-count">
              {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
            </span>
          </div>

          <div className="project-filters">
            <label>
              Country
              <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {countries.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label>
              Service
              <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                {services.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label>
              Status
              <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <button className="project-reset" type="button" onClick={resetFilters}>
              Reset filters
            </button>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="project-grid">
              {filteredProjects.map((project) => (
                <button
                  className="project-card"
                  key={project._id}
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <span className="project-card-country">{project.country}</span>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <span className={`project-status project-status-${project.status.toLowerCase()}`}>
                    {project.status}
                  </span>
                  <span className="project-card-more">View project details →</span>
                </button>
              ))}
            </div>
          ) : (
            <p className="projects-empty">No projects match the selected filters.</p>
          )}
        </section>
      </div>

      {/* ============ MODAL ============ */}
      {selectedProject && (
        <div
          className="project-modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="presentation"
        >
          <section
            className="project-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="project-modal-close"
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project details"
            >
              ×
            </button>
            <p className="projects-eyebrow">
              {selectedProject.country} · {selectedProject.year}
            </p>
            <h2 id="project-modal-title">{selectedProject.title}</h2>
            <p className="project-modal-description">{selectedProject.description}</p>
            <dl>
              <div><dt>Service</dt><dd>{selectedProject.service}</dd></div>
              <div><dt>Status</dt><dd>{selectedProject.status}</dd></div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
}