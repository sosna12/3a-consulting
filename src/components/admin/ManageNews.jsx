import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchNews, deleteNews } from "../../api/news";
import "./AdminNews.css";

export default function ManageNews() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchNews({ limit: 100 });
      setPosts(data.posts || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load news posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;

    try {
      await deleteNews(id);
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="admin-news">
      <div className="admin-news-header">
        <h1>Manage News</h1>
        <Link to="/admin/news/new" className="btn-primary">
          + New Post
        </Link>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="err">{error}</p>}

      {!loading && posts.length === 0 && (
        <div className="empty">
          <p>No news posts yet.</p>
          <Link to="/admin/news/new" className="btn-primary">
            Create your first post
          </Link>
        </div>
      )}

      {!loading && posts.length > 0 && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.category}</td>
                <td>{post.author?.name || "—"}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`badge ${post.published ? "published" : "draft"}`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </span>
                </td>
                <td className="actions">
                  <Link
                    to={`/admin/news/edit/${post._id}`}
                    className="btn-edit"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(post._id, post.title)}
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