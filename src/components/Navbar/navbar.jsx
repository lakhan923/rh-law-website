import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <Link
        to="/"
        className={styles.logoContainer}
        onClick={() => setIsMenuOpen(false)}
      >
        <img
          src="/assets/r_h_logo.png"
          alt="R & H Logo"
          className={styles.logoImage}
        />

        <span className={styles.logoText}>
          R & H Law Associates and Consultants LLP
        </span>
      </Link>

      <button
        className={`${styles.menuBtn} ${isMenuOpen ? styles.menuBtnOpen : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
        aria-expanded={isMenuOpen}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>

      <ul
        className={`${styles.menuItems} ${
          isMenuOpen ? styles.menuItemsOpen : ""
        }`}
      >
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
        </li>

        <li>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </Link>
        </li>

        <li>
          <Link to="/team" onClick={() => setIsMenuOpen(false)}>
            Team
          </Link>
        </li>

        <li>
          <Link to="/practice-areas" onClick={() => setIsMenuOpen(false)}>
            Practice Areas
          </Link>
        </li>

        <li>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
