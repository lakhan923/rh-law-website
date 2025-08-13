import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

  // Memoize the function so it can safely be used in useEffect
  const checkLoginStatus = useCallback(() => {
    const loginTime = parseInt(
      localStorage.getItem("adminLoginTime") || "0",
      10
    );
    const now = Date.now();

    if (
      localStorage.getItem("adminAuthed") === "1" &&
      now - loginTime < SEVEN_DAYS
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
      localStorage.removeItem("adminAuthed");
      localStorage.removeItem("adminLoginTime");
    }
  }, [SEVEN_DAYS]);

  // Run on mount and set interval to auto-expire
  useEffect(() => {
    checkLoginStatus();
    const interval = setInterval(checkLoginStatus, 60 * 1000); // every minute
    return () => clearInterval(interval);
  }, [checkLoginStatus]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const openLogin = () => {
    setIsMenuOpen(false);
    setIsLoginOpen(true);
  };

  const closeLogin = () => {
    setIsLoginOpen(false);
    setUsername("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const err = await res.json();
        setError(err.error || "Invalid credentials");
        return;
      }

      const data = await res.json();
      if (data.success) {
        localStorage.setItem("adminAuthed", "1");
        localStorage.setItem("adminLoginTime", Date.now().toString());
        setIsAdmin(true);
        closeLogin();
        navigate("/admin");
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };

  return (
    <>
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
          className={`${styles.menuBtn} ${
            isMenuOpen ? styles.menuBtnOpen : ""
          }`}
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
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/practice-areas" onClick={() => setIsMenuOpen(false)}>
              Practice Areas
            </Link>
          </li>

          {!isAdmin && (
            <li>
              <button onClick={openLogin} className={styles.ctaButton}>
                Admin Login
              </button>
            </li>
          )}

          {isAdmin && (
            <li>
              <Link
                to="/admin"
                onClick={() => setIsMenuOpen(false)}
                className={styles.ctaButton}
              >
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>

      {isLoginOpen && (
        <div
          className={styles.overlay}
          onClick={(e) => e.target === e.currentTarget && closeLogin()}
        >
          <div className={styles.modal} role="dialog" aria-modal="true">
            <button
              className={styles.closeBtn}
              onClick={closeLogin}
              aria-label="Close"
            >
              &times;
            </button>
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
              <input
                className={styles.input}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={styles.submitBtn}>
                Login
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
