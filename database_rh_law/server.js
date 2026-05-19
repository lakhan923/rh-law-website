require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const app = express();
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

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
    const token = jwt.sign(
      {
        username,
        role: "admin",
      },
      process.env.JWT_SECRET || "secret_key",
      { expiresIn: "2h" },
    );

    return res.json({
      success: true,
      token: token,
    });
  }

  return res.status(401).json({
    success: false,
    error: "Invalid credentials",
  });
});

// email helper functions
const sendAdminEmail = async ({ subject, text, cc }) => {
  return transporter.sendMail({
    from: `"R & H Law Associates" <${process.env.EMAIL_USER}>`,
    to: "qurratulain.rehman@rhlaw.com",
    cc: cc || "hareem.hilal@rhlaw.com",
    subject,
    text,
  });
};

const sendAutoReply = async ({ to, subject, text }) => {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
};

// Contact form with email + auto-reply
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const sql =
    "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], async (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Failed to save contact message" });
    }

    try {
      // Send email to admin
      await sendAdminEmail({
        subject: "New Contact Message",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      // Send auto-reply to client
      await sendAutoReply({
        to: email,
        subject: "We received your message",
        text: `Hi ${name},\n\nThank you for contacting R & H Law Associates & Consultants.\nWe have received your message and will get back to you shortly.\nFor urgent matters, you may contact our office directly. \n\nYours sincerely,\nR & H Law Associates`,
      });

      console.log("Message sent successfully");
    } catch (emailErr) {
      console.error("Error sending message:", emailErr);
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
        await sendAdminEmail({
          subject: "New Appointment Request",
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${preferred_date}\nPreferred Time: ${preferred_time}\nAdditional Info: ${additional_info || "N/A"}`,
        });

        // Auto-reply to client
        await sendAutoReply({
          to: email,
          subject: "We received your appointment request",
          text: `Hi ${name}, \n\nThank you for booking an appointment with R & H Law Associates & Consultants. \nWe have received your request for ${preferred_date} at ${preferred_time} and will confirm the schedule shortly. \n\n Yours sincerely,\n R & H Law Associates`,
        });

        console.log("Appointment email sent successfully");
      } catch (emailErr) {
        console.error("Error sending appointment email:", emailErr);
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
      await sendAdminEmail({
        subject: "New Feedback Received",
        text: `Name: ${name}\nEmail: ${email}\nFeedback: ${feedback}`,
      });

      // Auto-reply to client
      await sendAutoReply({
        to: email,
        subject: "Thank you for your feedback",
        text: `Hi ${name},\n\nThank you for your feedback. We truely appreciate your time and thoughts.\n\nYours sincerely,\nR & H Law Associates`,
      });

      console.log("Feedback email sent successfully");
    } catch (emailErr) {
      console.error("Error sending feedback email:", emailErr);
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
