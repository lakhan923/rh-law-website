import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  FaEnvelope,
  FaCalendarAlt,
  FaRegCommentDots,
  FaFileCsv,
} from "react-icons/fa";
import styles from "./admin.module.css";

export default function Admin() {
  const [messages, setMessages] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const [activeTab, setActiveTab] = useState("messages");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const navigate = useNavigate();

  /* =========================
     AUTH GUARD (JWT SAFE)
  ========================== */
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  /* =========================
     SAFE STRING HELPERS
  ========================== */
  const safe = (v) => (v == null ? "" : String(v));

  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const highlightText = (text, query) => {
    const t = safe(text);
    const q = safe(query).trim();

    if (!q) return t;

    const regex = new RegExp(`(${escapeRegex(q)})`, "gi");

    return t
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === q.toLowerCase() ? (
          <mark key={i}>{part}</mark>
        ) : (
          part
        ),
      );
  };

  /* =========================
     DATA FETCH (NO DEP WARNINGS)
  ========================== */
  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;

      try {
        const fetchWithAuth = async (url) => {
          const res = await fetch(url, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("API error");
          return res.json();
        };

        const [msg, appt, fb] = await Promise.all([
          fetchWithAuth("http://localhost:5000/api/messages"),
          fetchWithAuth("http://localhost:5000/api/appointments"),
          fetchWithAuth("http://localhost:5000/api/feedback"),
        ]);

        setMessages(Array.isArray(msg) ? msg : []);
        setAppointments(Array.isArray(appt) ? appt : []);
        setFeedbacks(Array.isArray(fb) ? fb : []);
      } catch (err) {
        console.error("Failed to load admin data:", err);
      }
    };

    loadData();
  }, []);

  /* =========================
     STATUS UPDATE (SECURE)
  ========================== */
  const handleStatusChange = async (id, newStatus) => {
    const token = localStorage.getItem("token");

    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a)),
    );

    try {
      await fetch(`http://localhost:5000/api/appointments/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  /* =========================
     FILTER LOGIC
  ========================== */
  const filterData = (data, type) => {
    if (!Array.isArray(data)) return [];

    const term = search.toLowerCase();

    if (type === "messages") {
      return data.filter(
        (i) =>
          safe(i.name).toLowerCase().includes(term) ||
          safe(i.email).toLowerCase().includes(term) ||
          safe(i.message).toLowerCase().includes(term),
      );
    }

    if (type === "appointments") {
      return data.filter((i) => {
        const status = safe(i.status);
        const statusMatch = statusFilter === "All" || status === statusFilter;

        return (
          statusMatch &&
          (safe(i.name).toLowerCase().includes(term) ||
            safe(i.email).toLowerCase().includes(term) ||
            safe(i.phone).toLowerCase().includes(term) ||
            safe(i.additional_info).toLowerCase().includes(term) ||
            status.toLowerCase().includes(term))
        );
      });
    }

    if (type === "feedbacks") {
      return data.filter(
        (i) =>
          safe(i.name).toLowerCase().includes(term) ||
          safe(i.email).toLowerCase().includes(term) ||
          safe(i.feedback).toLowerCase().includes(term),
      );
    }

    return [];
  };

  /* =========================
     TABLE RENDER
  ========================== */
  const renderTable = (data, type) => {
    const filtered = filterData(data, type);

    if (!filtered.length) {
      return <p className={styles.empty}>No {type} found</p>;
    }

    const columns = {
      messages: ["Name", "Email", "Message", "Submitted At"],
      appointments: [
        "Name",
        "Email",
        "Phone",
        "Preferred Date",
        "Preferred Time",
        "Additional Info",
        "Status",
        "Submitted At",
      ],
      feedbacks: ["Name", "Email", "Feedback", "Submitted At"],
    };

    const exportData = filtered.map((i) => ({
      Name: i.name,
      Email: i.email,
      Message: i.message || i.feedback,
      Phone: i.phone,
      "Preferred Date": i.preferred_date,
      "Preferred Time": i.preferred_time,
      "Additional Info": i.additional_info || "—",
      Status: i.status || "Pending",
      "Submitted At": new Date(i.submitted_at).toLocaleString(),
    }));

    return (
      <div className={styles.tableWrapper}>
        {/* FILTER BAR */}
        <div className={styles.filterRow}>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className={styles.searchInput}
          />

          {type === "appointments" && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusDropdown}
            >
              <option value="All">All</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
          )}

          <CSVLink
            data={exportData}
            filename={`${type}.csv`}
            className={styles.exportButton}
          >
            <FaFileCsv /> Export
          </CSVLink>
        </div>

        {/* TABLE */}
        <table className={styles.table}>
          <thead>
            <tr>
              {columns[type].map((c) => (
                <th key={c}>{c}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>{highlightText(item.name, search)}</td>
                <td>{highlightText(item.email, search)}</td>

                {type === "messages" && (
                  <>
                    <td>{highlightText(item.message, search)}</td>
                    <td>{new Date(item.submitted_at).toLocaleString()}</td>
                  </>
                )}

                {type === "appointments" && (
                  <>
                    <td>{safe(item.phone)}</td>
                    <td>{safe(item.preferred_date)}</td>
                    <td>{safe(item.preferred_time)}</td>
                    <td>{safe(item.additional_info) || "—"}</td>

                    <td>
                      <select
                        value={item.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Completed</option>
                      </select>
                    </td>

                    <td>{new Date(item.submitted_at).toLocaleString()}</td>
                  </>
                )}

                {type === "feedbacks" && (
                  <>
                    <td>{highlightText(item.feedback, search)}</td>
                    <td>{new Date(item.submitted_at).toLocaleString()}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* =========================
     UI
  ========================== */
  return (
    <div className={styles.adminContainer}>
      {/* KPI */}
      <div className={styles.kpiContainer}>
        <div className={styles.kpiCard}>
          <FaEnvelope />
          <h3>{messages.length}</h3>
          <p>Messages</p>
        </div>

        <div className={styles.kpiCard}>
          <FaCalendarAlt />
          <h3>{appointments.length}</h3>
          <p>Appointments</p>
        </div>

        <div className={styles.kpiCard}>
          <FaRegCommentDots />
          <h3>{feedbacks.length}</h3>
          <p>Feedbacks</p>
        </div>
      </div>

      {/* TABS */}
      <div className={styles.tabs}>
        {["messages", "appointments", "feedbacks"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setActiveTab(t);
              setSearch("");
              setStatusFilter("All");
            }}
            className={`${styles.tabButton} ${
              activeTab === t ? styles.activeTab : ""
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TABLES */}
      {activeTab === "messages" && renderTable(messages, "messages")}
      {activeTab === "appointments" &&
        renderTable(appointments, "appointments")}
      {activeTab === "feedbacks" && renderTable(feedbacks, "feedbacks")}
    </div>
  );
}
