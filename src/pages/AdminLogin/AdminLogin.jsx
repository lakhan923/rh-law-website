import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminLogin.module.css";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid credentials");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("adminLoginTime", Date.now().toString());

      navigate("/admin", { replace: true });
    } catch (err) {
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginCard}>
        <div className={styles.logoWrapper}>
          <img
            src="/assets/r_h_logo.png"
            alt="R&H Law Associates"
            className={styles.logo}
          />
        </div>

        <h1 className={styles.loginTitle}>Admin Portal</h1>

        <p className={styles.loginSubtitle}>
          Authorized access to the administrative dashboard.
        </p>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Username</label>

            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.inputLabel}>Password</label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button type="submit" className={styles.loginButton}>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
