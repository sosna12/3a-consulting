import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchJobById, createJob, updateJob } from "../../api/jobs";
import "./AdminNews.css";

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    type: "Full-time",
    department: "Engineering",
    location: "Addis Ababa, Ethiopia",
    description: "",
    responsibilities: "",
    requirements: "",
    experience: "",
    salary: "",
    deadline: "",
    applyEmail: "careers@3aconsulting.com",
    applyUrl: "",
    status: "Open",
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { job } = await fetchJobById(id);
        setFormData({
          title: job.title || "",
          type: job.type || "Full-time",
          department: job.department || "Engineering",
          location: job.location || "",
          description: job.description || "",
          responsibilities: job.responsibilities || "",
          requirements: job.requirements || "",
          experience: job.experience || "",
          salary: job.salary || "",
          deadline: job.deadline ? job.deadline.slice(0, 10) : "",
          applyEmail: job.applyEmail || "",
          applyUrl: job.applyUrl || "",
          status: job.status || "Open",
          published: job.published !== undefined ? job.published : true,
        });
      } catch (err) {
        setError("Failed to load job");
      }
    };
    load();
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = { ...formData };
      if (!payload.deadline) delete payload.deadline;

      if (isEdit) {
        await updateJob(id, payload);
      } else {
        await createJob(payload);
      }
      navigate("/admin/careers");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-news">
      <h1>{isEdit ? "Edit Job Opening" : "New Job Opening"}</h1>

      {error && <div className="err">{error}</div>}

      <form className="news-form" onSubmit={handleSubmit}>
        <label>
          Job Title *
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Type
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </label>

          <label>
            Department
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
            >
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Operations">Operations</option>
              <option value="Administration">Administration</option>
              <option value="Finance">Finance</option>
              <option value="IT">IT</option>
            </select>
          </label>
        </div>

        <div className="form-row">
          <label>
            Location *
            <input
              type="text"
              name="location"
              placeholder="e.g., Addis Ababa, Ethiopia"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Experience (optional)
            <input
              type="text"
              name="experience"
              placeholder="e.g., 3-5 years"
              value={formData.experience}
              onChange={handleChange}
            />
          </label>
        </div>

        <label>
          Short Description *
          <textarea
            name="description"
            rows="3"
            maxLength="1000"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Requirements (one per line)
          <textarea
            name="requirements"
            rows="5"
            placeholder="Bachelor's degree in Civil Engineering&#10;5+ years experience&#10;Proficiency in AutoCAD"
            value={formData.requirements}
            onChange={handleChange}
          />
        </label>

        <label>
          Responsibilities (one per line)
          <textarea
            name="responsibilities"
            rows="5"
            placeholder="Lead structural design&#10;Supervise site work&#10;Prepare reports"
            value={formData.responsibilities}
            onChange={handleChange}
          />
        </label>

        <div className="form-row">
          <label>
            Salary Range (optional)
            <input
              type="text"
              name="salary"
              placeholder="e.g., Competitive / Negotiable"
              value={formData.salary}
              onChange={handleChange}
            />
          </label>

          <label>
            Application Deadline (optional)
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Apply Email
            <input
              type="email"
              name="applyEmail"
              value={formData.applyEmail}
              onChange={handleChange}
            />
          </label>

          <label>
            Apply URL (optional — overrides email)
            <input
              type="text"
              name="applyUrl"
              placeholder="https://..."
              value={formData.applyUrl}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-row">
          <label>
            Status
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Open">Open</option>
              <option value="Closed">Closed</option>
            </select>
          </label>

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="published"
              checked={formData.published}
              onChange={handleChange}
            />
            Published on public site
          </label>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/careers")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving…" : isEdit ? "Update Job" : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  );
}