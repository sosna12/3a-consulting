import React, { useEffect, useState } from "react";
import {
  fetchMessages,
  updateMessage,
  deleteMessage,
} from "../../api/messages";
import "./AdminMessages.css";

export default function ManageMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | unread | starred
  const [selected, setSelected] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const params = { limit: 200 };
      if (filter === "unread") params.read = "false";
      if (filter === "starred") params.starred = "true";

      const data = await fetchMessages(params);
      setMessages(data.messages || []);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load messages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line
  }, [filter]);

  const handleOpen = async (msg) => {
    setSelected(msg);
    if (!msg.read) {
      try {
        await updateMessage(msg._id, { read: true });
        setMessages((prev) =>
          prev.map((m) => (m._id === msg._id ? { ...m, read: true } : m))
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleStar = async (id, starred) => {
    try {
      await updateMessage(id, { starred });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, starred } : m))
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete message.");
    }
  };

  const formatDate = (d) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="admin-messages">
      <div className="admin-messages-header">
        <h1>
          Contact Messages{" "}
          {unreadCount > 0 && (
            <span className="unread-badge">{unreadCount}</span>
          )}
        </h1>

        <div className="filter-tabs">
          <button
            className={filter === "all" ? "active" : ""}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={filter === "unread" ? "active" : ""}
            onClick={() => setFilter("unread")}
          >
            Unread
          </button>
          <button
            className={filter === "starred" ? "active" : ""}
            onClick={() => setFilter("starred")}
          >
            Starred
          </button>
        </div>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p className="err">{error}</p>}

      {!loading && messages.length === 0 && (
        <div className="empty">
          <p>
            {filter === "unread"
              ? "No unread messages."
              : filter === "starred"
              ? "No starred messages."
              : "No messages yet."}
          </p>
        </div>
      )}

      {!loading && messages.length > 0 && (
        <div className="messages-layout">
          {/* LEFT — list */}
          <div className="messages-list">
            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`message-row ${!msg.read ? "unread" : ""} ${
                  selected?._id === msg._id ? "active" : ""
                }`}
                onClick={() => handleOpen(msg)}
              >
                <div className="message-row-head">
                  <span className="message-from">{msg.name}</span>
                  <span className="message-date">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="message-subject">
                  {msg.subject || msg.service}
                </p>
                <p className="message-preview">
                  {msg.message.substring(0, 80)}
                  {msg.message.length > 80 ? "…" : ""}
                </p>
                <div className="message-row-foot">
                  {!msg.read && <span className="dot-unread" />}
                  <button
                    className={`star-btn ${msg.starred ? "starred" : ""}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStar(msg._id, !msg.starred);
                    }}
                    aria-label="Star message"
                  >
                    {msg.starred ? "★" : "☆"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — detail */}
          <div className="message-detail">
            {selected ? (
              <>
                <div className="message-detail-header">
                  <div>
                    <h2>{selected.subject || selected.service}</h2>
                    <p className="message-detail-from">
                      From <strong>{selected.name}</strong>{" "}
                      &lt;{selected.email}&gt;
                    </p>
                    <p className="message-detail-meta">
                      {formatDate(selected.createdAt)}
                      {selected.phone && ` · 📞 ${selected.phone}`}
                      {selected.company && ` · 🏢 ${selected.company}`}
                    </p>
                  </div>
                  <div className="message-actions">
                    <a
                      href={`mailto:${selected.email}?subject=Re: ${
                        selected.subject || selected.service
                      }`}
                      className="btn-reply"
                    >
                      Reply
                    </a>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(selected._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="message-detail-body">
                  {selected.message.split("\n").map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>

                <div className="message-detail-foot">
                  <span className="service-tag">{selected.service}</span>
                  {selected.starred && (
                    <span className="star-tag">★ Starred</span>
                  )}
                </div>
              </>
            ) : (
              <div className="message-empty">
                <p>Select a message to read it</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}