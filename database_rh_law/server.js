require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const nodemailer = require("nodemailer");

// -------------------- MIDDLEWARE --------------------
app.use(cors());
app.use(express.json()); // Handles JSON requests

// -------------------- DATABASE --------------------
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

// -------------------- EMAIL TRANSPORTER --------------------
const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// -------------------- ROUTES --------------------
// Admin login
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

// Contact form with email + auto-reply
app.post("/api/contact", (req, res) => {
  console.log("Received contact data:", req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], async (err, result) => {
    if (err) {
      console.error("Insert error (contact):", err);
      return res.status(500).json({ error: "Failed to save contact message" });
    }

    try {
      // Send email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Contact Message",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      // Send auto-reply to client
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "We received your message",
        text: `Dear ${name},\n\nThank you for contacting R & H Law Associates & Consultants.\nWe have received your message and will get back to you shortly.\n\nRegards,\nR & H Law Associates`,
      });

      console.log("Emails sent successfully");
    } catch (emailErr) {
      console.error("Error sending emails:", emailErr);
    }

    res.json({ success: true, id: result.insertId });
  });
});

// Appointment form
app.post("/api/appointment", (req, res) => {
  const {
    name,
    email,
    phone,
    preferred_date,
    preferred_time,
    additional_info,
  } = req.body;

  if (!name || !email || !phone || !preferred_date || !preferred_time)
    return res.status(400).json({ error: "Missing required fields" });

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
    async (err, result) => {
      if (err) {
        console.error("DB insert error (appointment):", err);
        return res.status(500).json({ error: "Failed to save appointment" });
      }

      try {
        // Email to admin
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: "New Appointment Request",
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${preferred_date}\nPreferred Time: ${preferred_time}\nAdditional Info: ${additional_info || "N/A"}`,
        });

        // Auto-reply to client
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: "Your appointment request received",
          text: `Dear ${name}, \n\nThank you for requesting an appointment with R & H Law Associates & Consultants. \nWe have received your request for ${preferred_date} at ${preferred_time} and will confirm the schedule shortly. \n\n Regards,\n R & H Law Associates`,
        });

        console.log("Appointment emails sent successfully");
      } catch (emailErr) {
        console.error("Error sending appointment emails:", emailErr);
      }

      res.json({ success: true, id: result.insertId });
    },
  );
});

// Feedback form
app.post("/api/feedback", (req, res) => {
  const { name, email, feedback } = req.body;

  if (!name || !email || !feedback)
    return res.status(400).json({ error: "All fields are required" });

  const sql = "INSERT INTO feedback (name, email, feedback) VALUES (?, ?, ?)";

  db.query(sql, [name, email, feedback], async (err, result) => {
    if (err) {
      console.error("DB insert error (feedback):", err);
      return res.status(500).json({ error: "Failed to save feedback" });
    }

    try {
      // Email to admin
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Feedback Received",
        text: `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`,
      });

      // Auto-reply to client
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for your feedback",
        text: `Dear ${name},\n\nThank you for your feedback. We appreciate your time and thoughts.\n\nRegards,\nR & H Law Associates`,
      });

      console.log("Feedback emails sent successfully");
    } catch (emailErr) {
      console.error("Error sending feedback emails:", emailErr);
    }

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
    },
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
    },
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
    },
  );
});

// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
