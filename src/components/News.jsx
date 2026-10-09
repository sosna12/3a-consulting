import React, { useState, useEffect } from "react";
import { fetchNews } from "../api/news";
import { Link } from "react-router-dom";

export default function News() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const loadNews = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchNews({ limit: 100 });
        setPosts(data.posts || []);
      } catch (err) {
        console.error("Failed to load news:", err);
        setError("Failed to load news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadNews();
  }, []);

  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage));
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <main className="news-page">
      <div className="news-wrapper">
        <h1 className="news-page-title">NEWS</h1>

        {loading && <p className="news-loading">Loading news…</p>}

        {error && <p className="news-error">{error}</p>}

        {!loading && !error && posts.length === 0 && (
          <div className="news-list">
            <p className="news-empty">
              No news published yet. Check back soon.
            </p>
          </div>
        )}

        {!loading && !error && currentPosts.length > 0 && (
          <>
            <div className="news-list">
              {currentPosts.map((post) => (
                <article key={post._id} className="news-post">
                  {post.image && (
                    <div className="news-post-image">
                      <img src={post.image} alt={post.title} />
                    </div>
                  )}

                  <h2 className="news-post-title">{post.title}</h2>

                     <p className="news-post-meta">
  <Link to="/contact" className="meta-link">Leave a Comment</Link>
  {" / "}
  <Link to="/news" className="meta-link">{post.category}</Link>
  {" / "}
  {post.author?.name || "Admin"}
  {" / "}
  {formatDate(post.createdAt)}
</p>

                  <p className="news-post-excerpt">{post.excerpt}</p>

                  <a href={`#post-${post._id}`} className="news-read-more">
                    Read More »
                  </a>
                </article>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="news-pagination">
                <button
                  className="page-nav"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={`page-number ${currentPage === n ? "active" : ""}`}
                      onClick={() => goToPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  className="page-nav"
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}