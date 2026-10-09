import React, { useState } from "react";

const policyData = [
  {
    category: "People & Conduct Policies",
    icon: "👥",
    items: [
      {
        title: "Human Resources Management Policy",
        description:
          "Guidelines for managing our most valuable asset: our people. This covers everything from hiring to retirement.",
      },
      {
        title: "Gifts & Hospitality Policy",
        description:
          "Maintaining integrity by setting clear rules on giving and receiving gifts or hospitality.",
      },
      {
        title: "Ethics and Code of Conduct Policy",
        description:
          "Outlines the company's commitment to honesty, integrity, and professional behavior for all employees and partners.",
      },
      {
        title: "Board of Directors' Ethical Commitment Policy",
        description:
          "The Board's pledge to uphold the highest standards of ethics and integrity, guiding all company actions.",
      },
      {
        title: "Anti-Bribery (Fraud) and Investigation Policy",
        description:
          "Promotes honesty and integrity by outlining procedures for preventing, detecting, and investigating bribery and fraudulent activities.",
      },
      {
        title: "Whistleblowing Policy",
        description:
          "Encourages employees to report concerns or wrongdoing, ensuring protection from retaliation through thorough investigation.",
      },
      {
        title:
          "Related Parties, Former Public Officials, and Conflicts of Interest Policy",
        description:
          "Ensures integrity and transparency by preventing conflicts of interest, especially involving related parties and former public officials.",
      },
    ],
  },
  {
    category: "Projects & Operations Policies",
    icon: "⚙️",
    items: [
      {
        title: "Project Risk Management Policy",
        description:
          "Identifying, assessing, and managing risks to ensure project success.",
      },
      {
        title: "Projects Contracting Policy",
        description:
          "Ensuring fairness and proper management in all project contracts.",
      },
      {
        title: "Procurement Policy",
        description:
          "How we purchase goods and services fairly, transparently, and cost-effectively.",
      },
      {
        title: "Environmental Protection Policy",
        description:
          "Our commitment to protecting the environment and implementing sustainable practices in all operations.",
      },
      {
        title: "Business Development (BD) Policy",
        description:
          "A framework for growing our business through strategic initiatives, client relationships, and ethical sales practices.",
      },
      {
        title: "Tendering Policy and Procedures",
        description:
          "Guidelines for preparing and submitting tenders for civil engineering and other projects, ensuring fairness and transparency.",
      },
      {
        title: "Project Management Policy",
        description:
          "Ensures all projects are delivered on time, within budget, and to the required quality standards, meeting client expectations.",
      },
      {
        title: "Sub Contracting and Partnering Policy",
        description:
          "Governs how we engage with subcontractors and partners to ensure proper management, alignment with objectives, and ethical collaboration.",
      },
    ],
  },
  {
    category: "Finance & Governance Policies",
    icon: "⚖️",
    items: [
      {
        title: "Finance & Accounting Policy",
        description: "Managing our financial resources effectively and with integrity.",
      },
      {
        title: "Internal Control Policy",
        description: "Safeguarding assets and ensuring reliable financial reporting.",
      },
      {
        title: "Executive Management Policy",
        description:
          "Establishes the framework for how executive management operates, aligning with strategic goals and overseeing company performance.",
      },
      {
        title: "Enterprise Risk Management (ERM) Policy",
        description:
          "A comprehensive approach to identifying, assessing, and managing risks across the entire organization to achieve strategic objectives.",
      },
      {
        title: "Donations and Sponsorship Policy",
        description:
          "Ensures responsible and transparent giving back to the community through donations and sponsorships.",
      },
      {
        title: "Compliance and Monitoring Policy",
        description:
          "Ensuring we meet legal, regulatory, and ethical standards through continuous monitoring and reporting.",
      },
    ],
  },
  {
    category: "Information & Technology Policies",
    icon: "💻",
    items: [
      {
        title: "Records Management Policy",
        description: "How we create, store, maintain, and dispose of company records.",
      },
      {
        title: "Information & Communication Technology (ICT) Policy",
        description:
          "Guidelines for the secure and reliable use of our technology resources.",
      },
    ],
  },
];

export default function Policy() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = policyData
    .map((category) => {
      const matchingItems = category.items.filter(
        (item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      return { ...category, items: matchingItems };
    })
    .filter((category) => category.items.length > 0);

  return (
    <main className="policy-page">

      {/* ============ PAGE HEADER ============ */}
      <section className="policy-header">
        <h1 className="policy-page-title">Policy</h1>

        <div className="policy-intro">
          <h2>3A Interactive Policy Guide</h2>
          <p>Your single source for exploring company policies and procedures.</p>

          <div className="policy-search-wrap">
            <input
              type="text"
              placeholder="Search for a policy..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="policy-search"
            />
          </div>
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="policy-content">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((cat, idx) => (
            <div key={idx} className="policy-category">

              <div className="policy-category-header">
                <span className="policy-icon">{cat.icon}</span>
                <h3>{cat.category}</h3>
              </div>

              <div className="policy-grid">
                {cat.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="policy-card">
                    <h4 className="policy-card-title">{item.title}</h4>
                    <p className="policy-card-desc">{item.description}</p>
                  </div>
                ))}
              </div>

            </div>
          ))
        ) : (
          <div className="policy-no-results">No matching policies found.</div>
        )}

        {/* ============ DOWNLOAD BLOCK ============ */}
        <div className="policy-download">
          <p>
            Kindly download and review the linked{" "}
            <strong>comprehensive policy documents</strong> for full details
            regarding <strong>our various company guidelines, standards, and
            operational procedures</strong>. Your understanding is appreciated.
          </p>
          <iframe
            className="policy-document-preview"
            src="/Construction%20industry%20policy%20final%20version.pdf"
            title="3A Consulting comprehensive policy document preview"
          />
          <div className="policy-download-actions">
            <div className="policy-download-label">
              3A Policy (All in one)
            </div>
            <a
              href="/Construction%20industry%20policy%20final%20version.pdf"
              download
              className="policy-download-btn"
              aria-label="Download Construction industry policy final version PDF"
            >
              Download
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}