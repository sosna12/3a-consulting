// ================================================
//  AdminDashboard — Awoke's control center
// ================================================

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchDashboardStats } from "../api/dashboard";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const loadStats = async (showLoading = false) => {
    if (showLoading) setLoading(true);
    try {
      const res = await fetchDashboardStats();
      setData(res);
      setLastUpdated(new Date());
      setError("");
    } catch (err) {
      console.error("Dashboard error:", err);
      setError("Failed to load dashboard stats.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Initial load + auto-refresh every 30s
  useEffect(() => {
    loadStats(true);
    const interval = setInterval(() => loadStats(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const formatTime = (date) => {
    const diff = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
    if (diff < 60) return "just now";
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    return `${Math.floor(diff / 86400)}d ago`;
  };

  const counts = data?.counts || { news: 0, projects: 0, jobs: 0, messages: 0, unread: 0, starred: 0 };
  const recent = data?.recent || { news: [], projects: [], jobs: [], messages: [] };

  // Merge all recent items into one activity feed
  const activity = [
    ...recent.news.map((n) => ({ type: "news", icon: "📰", label: "News", title: n.title, createdAt: n.createdAt, link: "/admin/news" })),
    ...recent.projects.map((p) => ({ type: "project", icon: "🏗️", label: "Project", title: p.title, createdAt: p.createdAt, link: "/admin/projects" })),
    ...recent.jobs.map((j) => ({ type: "job", icon: "💼", label: "Job", title: j.title, createdAt: j.createdAt, link: "/admin/careers" })),
    ...recent.messages.map((m) => ({ type: "message", icon: "📩", label: "Message", title: `${m.name}: ${m.subject || m.service}`, createdAt: m.createdAt, link: "/admin/messages" })),
  ]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 8);

  return (
    <main className="admin-page">

      {/* ============ TOP BAR ============ */}
      <div className="admin-topbar">
        <div>
          <h1>Dashboard</h1>
          <p>
            Welcome back, <strong>{user?.name}</strong>
            <span className="admin-live-dot" title="Live">
              ●
            </span>
            <span className="admin-updated">
              Updated {formatTime(lastUpdated)}
            </span>
          </p>
        </div>

        <div className="admin-topbar-actions">
          <button
            className="btn-refresh"
            onClick={() => loadStats(true)}
            disabled={loading}
            title="Refresh"
          >
            {loading ? "Loading…" : "↻ Refresh"}
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>

      {error && <div className="admin-error">{error}</div>}

      {/* ============ STATS CARDS ============ */}
      <section className="admin-stat-section">
        <h2 className="admin-section-title">Overview</h2>
        <div className="admin-stat-grid">

          <Link to="/admin/news" className="stat-tile">
            <div className="stat-tile-icon">📰</div>
            <div className="stat-tile-body">
              <p className="stat-tile-value">{loading ? "—" : counts.news}</p>
              <p className="stat-tile-label">News Posts</p>
            </div>
          </Link>

          <Link to="/admin/projects" className="stat-tile">
            <div className="stat-tile-icon">🏗️</div>
            <div className="stat-tile-body">
              <p className="stat-tile-value">{loading ? "—" : counts.projects}</p>
              <p className="stat-tile-label">Projects</p>
            </div>
          </Link>

          <Link to="/admin/careers" className="stat-tile">
            <div className="stat-tile-icon">💼</div>
            <div className="stat-tile-body">
              <p className="stat-tile-value">{loading ? "—" : counts.jobs}</p>
              <p className="stat-tile-label">Job Openings</p>
            </div>
          </Link>

          <Link to="/admin/messages" className="stat-tile">
            <div className="stat-tile-icon">
              📩
              {counts.unread > 0 && (
                <span className="stat-tile-badge">{counts.unread}</span>
              )}
            </div>
            <div className="stat-tile-body">
              <p className="stat-tile-value">{loading ? "—" : counts.messages}</p>
              <p className="stat-tile-label">
                Messages
                {counts.unread > 0 && (
                  <span className="stat-tile-unread">
                    {counts.unread} unread
                  </span>
                )}
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* ============ QUICK ACTIONS ============ */}
      <section className="admin-section">
        <h2 className="admin-section-title">Quick Actions</h2>
        <div className="quick-actions">
          <Link to="/admin/news/new" className="quick-btn">
            <span>+</span> New News Post
          </Link>
          <Link to="/admin/projects/new" className="quick-btn">
            <span>+</span> New Project
          </Link>
          <Link to="/admin/careers/new" className="quick-btn">
            <span>+</span> New Job Opening
          </Link>
          <Link to="/admin/messages" className="quick-btn quick-btn-secondary">
            Open Inbox
          </Link>
        </div>
      </section>

      {/* ============ ACTIVITY FEED ============ */}
      <section className="admin-section">
        <h2 className="admin-section-title">Recent Activity</h2>

        {loading && <p className="activity-empty">Loading activity…</p>}

        {!loading && activity.length === 0 && (
          <p className="activity-empty">No recent activity yet.</p>
        )}

        {!loading && activity.length > 0 && (
          <div className="activity-feed">
            {activity.map((item, i) => (
              <Link to={item.link} key={i} className="activity-item">
                <div className="activity-icon">{item.icon}</div>
                <div className="activity-content">
                  <p className="activity-type">{item.label}</p>
                  <p className="activity-title">{item.title}</p>
                </div>
                <div className="activity-time">
                  {formatTime(item.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}