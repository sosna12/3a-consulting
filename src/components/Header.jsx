import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Projects", href: "/projects" },
    { label: "Careers", href: "/careers" },
    { label: "Policy", href: "/policy" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="site-header">
      <nav className="nav-container">
        <Link to="/" className="brand-link" aria-label="3A Consulting Engineers home">
          <img src={logo} alt="3A Consulting Engineers" />
        </Link>
        <button
          className="menu-toggle"
          type="button"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isMenuOpen}
          aria-controls="primary-navigation"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <ul
          className={`main-nav${isMenuOpen ? " is-open" : ""}`}
          id="primary-navigation"
        >
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className={pathname === link.href ? "active" : ""}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <button className="search-btn" aria-label="Search">🔍</button>
      </nav>
    </header>
  );
}