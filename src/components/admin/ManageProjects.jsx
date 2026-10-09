import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProjects, deleteProject } from "../../api/projects";
import "./AdminNews.css";   // reuse the same styles

export default function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchProjects({ limit: 100 });
      setProjects(data.projects || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load projects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="admin-news">
      <div className="admin-news-header">
        <h1>Manage Projects</h1>
        <Link to="/admin/projects/new" className="btn-primary">
          + New Project
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="err">{error}</p>}

      {!loading && projects.length === 0 && (
        <div className="empty">
          <p>No projects yet.</p>
          <Link to="/admin/projects/new" className="btn-primary">
            Create your first project
          </Link>
        </div>
      )}

      {!loading && projects.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Location</th>
              <th>Year</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p._id}>
                <td>{p.title}</td>
                <td>{p.category}</td>
                <td>{p.location}</td>
                <td>{p.year || "—"}</td>
                <td>
                  <span className={`badge ${p.published ? "published" : "draft"}`}>
                    {p.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="actions">
                  <Link to={`/admin/projects/edit/${p._id}`} className="btn-edit">
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(p._id, p.title)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}