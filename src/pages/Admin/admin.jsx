import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./admin.module.css";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  // Guard route
  useEffect(() => {
    if (localStorage.getItem("adminAuthed") !== "1") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Only fetch if authed
  useEffect(() => {
    if (localStorage.getItem("adminAuthed") !== "1") return;

    // Fetch contact messages
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data))
      .catch((err) => console.error("Error fetching messages:", err));

    // Fetch appointments
    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(data))
      .catch((err) => console.error("Error fetching appointments:", err));

    // Fetch feedbacks
    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedback:", err));
  }, []);

  return (
    <div className={styles.container}>
      {/* Full-page background image using <img> */}
      <img
        src="/assets/dashboard_photo.jpg"
        alt="Background"
        className={styles.backgroundImage}
        loading="eager"
      />

      <h1>Welcome to the Admin Dashboard</h1>

      {/* Contact Messages */}
      <section>
        <h2>Contact Messages</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.message}</td>
                  <td>{new Date(msg.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No messages found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Appointments */}
      <section className={styles.sectionMargin}>
        <h2>Appointments</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Time</th>
              <th>Additional Info</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <tr key={appt.id}>
                  <td>{appt.name}</td>
                  <td>{appt.email}</td>
                  <td>{appt.phone}</td>
                  <td>{appt.preferred_date}</td>
                  <td>{appt.preferred_time}</td>
                  <td>{appt.additional_info || "—"}</td>
                  <td>{new Date(appt.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  No appointments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* feedback Messages */}
      <section className={styles.sectionMargin}>
        <h2>Feedbacks</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Feedback</th>
              <th>Submitted At</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.length > 0 ? (
              feedbacks.map((msg) => (
                <tr key={msg.id}>
                  <td>{msg.name}</td>
                  <td>{msg.email}</td>
                  <td>{msg.feedback}</td>
                  <td>{new Date(msg.submitted_at).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No feedbacks found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}
