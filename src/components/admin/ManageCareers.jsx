import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJobs, deleteJob } from "../../api/jobs";
import "./AdminNews.css";   // reuse admin table styles

export default function ManageCareers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchJobs({ limit: 100 });
      setJobs(data.jobs || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load jobs.");
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
      await deleteJob(id);
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete job.");
    }
  };

  return (
    <div className="admin-news">
      <div className="admin-news-header">
        <h1>Manage Careers</h1>
        <Link to="/admin/careers/new" className="btn-primary">
          + New Job Opening
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="err">{error}</p>}

      {!loading && jobs.length === 0 && (
        <div className="empty">
          <p>No job openings yet.</p>
          <Link to="/admin/careers/new" className="btn-primary">
            Post your first opening
          </Link>
        </div>
      )}

      {!loading && jobs.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Department</th>
              <th>Type</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.title}</td>
                <td>{job.department}</td>
                <td>{job.type}</td>
                <td>{job.location}</td>
                <td>
                  <span
                    className={`badge ${job.status === "Open" ? "published" : "draft"}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="actions">
                  <Link
                    to={`/admin/careers/edit/${job._id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(job._id, job.title)}
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