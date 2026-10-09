import React, { useState } from "react";
import { submitMessage } from "../api/messages";
import "./Contact.css";

const branchOffices = [
  {
    title: "Headquarters – Ethiopia",
    location: "Addis Ababa, Ethiopia",
    poBox: "1234",
    phone: "+251 91 012 0305",
    email: "awe.azene2@gmail.com",
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "General Inquiry",
    subject: "",
    message: "",
    website: "", // honeypot — should remain empty
  });

  const [status, setStatus] = useState(null); // { type, text }
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await submitMessage(formData);
      setStatus({ type: "success", text: res.message });
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service: "General Inquiry",
        subject: "",
        message: "",
        website: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      setStatus({ type: "error", text: msg });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
      </div>

      <div className="contact-section">
        <h2 className="section-title">3A Consulting Branch Offices</h2>

        <div className="branches-grid">
          {branchOffices.map((office, idx) => (
            <div key={idx} className="branch-card">
              <h3>{office.title}</h3>
              <p><strong>Location:</strong> {office.location}</p>
              {office.poBox && <p><strong>PO Box:</strong> {office.poBox}</p>}
              <p><strong>Phone:</strong> {office.phone}</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${office.email}`}>{office.email}</a>
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-form-container">
        <div className="contact-form-card">
          <p className="form-description">
            We're ready to discuss your project's needs. Send us a message and
            we'll get back to you within 1–2 business days.
          </p>

          {status && (
            <div className={`form-alert ${status.type}`}>
              {status.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Full name *"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your email *"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                value={formData.phone}
                onChange={handleChange}
              />
              <input
                type="text"
                name="company"
                placeholder="Company (optional)"
                value={formData.company}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                <option value="General Inquiry">General Inquiry</option>
                <option value="Engineering Consulting">Engineering Consulting</option>
                <option value="Project Management">Project Management</option>
                <option value="Site Supervision">Site Supervision</option>
                <option value="Design Solutions">Design Solutions</option>
                <option value="Partnership">Partnership</option>
                <option value="Careers">Careers</option>
                <option value="Other">Other</option>
              </select>

              <input
                type="text"
                name="subject"
                placeholder="Subject (optional)"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            {/* Honeypot — hidden from real users, bots fill it */}
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                height: 0,
              }}
            />

            <div className="form-row full-width">
              <textarea
                name="message"
                placeholder="Tell us about your project... *"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Sending…" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}