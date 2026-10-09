import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-links">
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#news">News</a>
        <a href="#projects">Projects</a>
        <a href="#careers">Careers</a>
      </div>

      <div className="footer-copy">
        © 2000 – {new Date().getFullYear()} 3A Consulting Engineers. All rights reserved.
      </div>

      <div className="footer-socials">
        <a href="#facebook" aria-label="Facebook">ⓕ</a>
        <a href="#twitter" aria-label="Twitter">𝕏</a>
        <a href="#instagram" aria-label="Instagram">📷</a>
      </div>
    </footer>
  );
}