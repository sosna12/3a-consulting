import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchNewsById, createNews, updateNews } from "../../api/news";
import "./AdminNews.css";

export default function NewsForm() {
  const { id } = useParams();       // present only in edit mode
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: "",
    category: "NEWS",
    image: "",
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // If editing, load existing post
  useEffect(() => {
    if (!isEdit) return;
    const load = async () => {
      try {
        const { post } = await fetchNewsById(id);
        setFormData({
          title: post.title || "",
          excerpt: post.excerpt || "",
          body: post.body || "",
          category: post.category || "NEWS",
          image: post.image || "",
          published: post.published !== undefined ? post.published : true,
        });
      } catch (err) {
        setError("Failed to load post");
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
        await updateNews(id, formData);
      } else {
        await createNews(formData);
      }
      navigate("/admin/news");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-news">
      <h1>{isEdit ? "Edit Post" : "New Post"}</h1>

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
          Body (full content) *
          <textarea
            name="body"
            rows="10"
            value={formData.body}
            onChange={handleChange}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Category
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="NEWS">NEWS</option>
              <option value="PROJECT">PROJECT</option>
              <option value="ANNOUNCEMENT">ANNOUNCEMENT</option>
              <option value="PRESS">PRESS</option>
            </select>
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
        </div>

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
            onClick={() => navigate("/admin/news")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Saving…" : isEdit ? "Update Post" : "Create Post"}
          </button>
        </div>
      </form>
    </div>
  );
}