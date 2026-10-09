import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchProjectById,
  createProject,
  updateProject,
} from "../../api/projects";
import "./AdminNews.css";

export default function ProjectForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

const [formData, setFormData] = useState({
  title: "",
  country: "",          // ← was "location"
  service: "",          // ← was "category"
  status: "Completed",
  year: "",
  description: "",      // ← was "excerpt"
  body: "",
  image: "",
  published: true,
});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { project } = await fetchProjectById(id);
 setFormData({
  title: project.title || "",
  country: project.country || "",
  service: project.service || "",
  status: project.status || "Completed",
  year: project.year || "",
  description: project.description || "",
  body: project.body || "",
  image: project.image || "",
  published: project.published !== undefined ? project.published : true,
});
      } catch (err) {
        setError("Failed to load project");
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
      if (isEdit) {
        await updateProject(id, formData);
      } else {
        await createProject(formData);
      }
      navigate("/admin/projects");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-news">
      <h1>{isEdit ? "Edit Project" : "New Project"}</h1>

      {error && <div className="err">{error}</div>}

      <form className="news-form" onSubmit={handleSubmit}>
        <label>
          Title *
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
            Category *
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="Roads">Roads</option>
              <option value="Airports">Airports</option>
              <option value="Bridges">Bridges</option>
              <option value="Water">Water</option>
              <option value="Buildings">Buildings</option>
              <option value="Other">Other</option>
            </select>
          </label>

          <label>
            Location *
            <input
              type="text"
              name="location"
              placeholder="e.g., Oromia, Ethiopia"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <label>
          Excerpt (short summary) *
          <textarea
            name="excerpt"
            rows="3"
            maxLength="500"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Full Description (optional)
          <textarea
            name="description"
            rows="6"
            value={formData.description}
            onChange={handleChange}
          />
        </label>

        <label>
          Image URL (optional)
          <input
            type="text"
            name="image"
            placeholder="https://..."
            value={formData.image}
            onChange={handleChange}
          />
        </label>

        <div className="form-row">
          <label>
            Client (optional)
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleChange}
            />
          </label>

          <label>
            Year (optional)
            <input
              type="text"
              name="year"
              placeholder="e.g., 2024"
              value={formData.year}
              onChange={handleChange}
            />
          </label>
        </div>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured on homepage
        </label>

        <label className="checkbox-label">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
          />
          Published (visible on the public site)
        </label>

        <div className="form-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/admin/projects")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving…" : isEdit ? "Update Project" : "Create Project"}
          </button>
        </div>
      </form>
    </div>
  );
}