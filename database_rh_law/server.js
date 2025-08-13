require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Handles JSON requests

// Connect to MariaDB
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to MariaDB");
});

// -------------------- ROUTES --------------------

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true });
  }
  return res.status(401).json({ success: false, error: "Invalid credentials" });
});

// Contact form POST
app.post("/api/contact", (req, res) => {
  console.log("Received contact data:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error("Insert error (contact):", err);
      return res.status(500).json({ error: "Failed to save contact message" });
    }
    res.json({ success: true, id: result.insertId });
  });
});

// Appointment form POST
app.post("/api/appointment", (req, res) => {
  console.log("Received appointment data:", req.body); // Debug log

  const {
    name,
    email,
    phone,
    preferred_date,
    preferred_time,
    additional_info,
  } = req.body;

  if (!name || !email || !phone || !preferred_date || !preferred_time) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO appointments (name, email, phone, preferred_date, preferred_time, additional_info) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      name,
      email,
      phone,
      preferred_date,
      preferred_time,
      additional_info || null,
    ],
    (err, result) => {
      if (err) {
        console.error("Insert error (appointment):", err);
        return res.status(500).json({ error: "Failed to save appointment" });
      }
      res.json({ success: true, id: result.insertId });
    }
  );
});

// POST /api/feedback - Save feedback to database
app.post("/api/feedback", (req, res) => {
  console.log("Received feedback data:", req.body);

  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback) {
    console.log("Validation failed: Missing fields");
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO feedback (name, email, `feedback`) VALUES (?, ?, ?)";

  db.query(sql, [name, email, feedback], (err, result) => {
    if (err) {
      console.error("Error saving feedback:", err);
      return res.status(500).json({ error: "Database error" });
    }
    console.log("Feedback saved with ID:", result.insertId);
    res.json({ success: true, id: result.insertId });
  });
});

// Fetch contact messages
app.get("/api/messages", (req, res) => {
  console.log("GET /api/messages called");
  db.query(
    "SELECT * FROM contact_messages ORDER BY submitted_at DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching messages:", err);
        return res.status(500).json({ error: "Failed to fetch messages" });
      }
      res.json(results);
    }
  );
});

// Fetch appointments
app.get("/api/appointments", (req, res) => {
  console.log("GET /api/appointments called");
  db.query(
    "SELECT * FROM appointments ORDER BY submitted_at DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching appointments:", err);
        return res.status(500).json({ error: "Failed to fetch appointments" });
      }
      res.json(results);
    }
  );
});

// Fetch feedback
app.get("/api/feedback", (req, res) => {
  console.log("GET /api/feedback called");
  db.query(
    "SELECT * FROM feedback ORDER BY submitted_at DESC",
    (err, results) => {
      if (err) {
        console.error("Error fetching feedbacks:", err);
        return res.status(500).json({ error: "Failed to fetch feedbacks" });
      }
      res.json(results);
    }
  );
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
