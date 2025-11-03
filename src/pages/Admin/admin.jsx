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

  // Guard route
  useEffect(() => {
    if (localStorage.getItem("adminAuthed") !== "1") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Fetch data
  useEffect(() => {
    if (localStorage.getItem("adminAuthed") !== "1") return;

    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments(Array.isArray(data) ? data : []))
      .catch(console.error);

    fetch("http://localhost:5000/api/feedback")
      .then((res) => res.json())
      .then((data) => setFeedbacks(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Highlight search matches
  const highlight = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return String(text).replace(regex, (match) => `<mark>${match}</mark>`);
  };

  // Filter data
  const filterData = (data, type) => {
    if (!Array.isArray(data)) return [];
    const term = search.toLowerCase();

    if (type === "messages") {
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term) ||
          item.message.toLowerCase().includes(term)
      );
    }

    if (type === "appointments") {
      return data.filter((item) => {
        const statusMatch =
          statusFilter === "All" || item.status === statusFilter;
        return (
          statusMatch &&
          (item.name.toLowerCase().includes(term) ||
            item.email.toLowerCase().includes(term) ||
            item.phone.toLowerCase().includes(term) ||
            (item.additional_info || "").toLowerCase().includes(term) ||
            (item.status || "").toLowerCase().includes(term))
        );
      });
    }

    if (type === "feedbacks") {
      return data.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.email.toLowerCase().includes(term) ||
          item.feedback.toLowerCase().includes(term)
      );
    }

    return [];
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.id === id ? { ...appt, status: newStatus } : appt
      )
    );
    fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch(console.error);
  };

  // Render Table
  const renderTable = (data, type) => {
    const filtered = filterData(data, type);
    if (!filtered.length)
      return <p className={styles.empty}>No {type} found</p>;

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

    return (
      <div className={styles.tableWrapper}>
        <div className={styles.filterRow}>
          <input
            type="text"
            placeholder="Search..."
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {type === "appointments" && (
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className={styles.statusDropdown}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Completed">Completed</option>
            </select>
          )}

          <CSVLink
            data={filtered.map((item) => {
              if (type === "messages")
                return {
                  Name: item.name,
                  Email: item.email,
                  Message: item.message,
                  "Submitted At": new Date(item.submitted_at).toLocaleString(),
                };
              if (type === "appointments")
                return {
                  Name: item.name,
                  Email: item.email,
                  Phone: item.phone,
                  "Preferred Date": item.preferred_date,
                  "Preferred Time": item.preferred_time,
                  "Additional Info": item.additional_info || "—",
                  Status: item.status || "Pending",
                  "Submitted At": new Date(item.submitted_at).toLocaleString(),
                };
              if (type === "feedbacks")
                return {
                  Name: item.name,
                  Email: item.email,
                  Feedback: item.feedback,
                  "Submitted At": new Date(item.submitted_at).toLocaleString(),
                };
              return {};
            })}
            filename={`${type}.csv`}
            className={styles.exportButton}
          >
            <FaFileCsv /> Export CSV
          </CSVLink>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              {columns[type].map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((item) => (
              <tr key={item.id}>
                {type === "messages" && (
                  <>
                    <td
                      data-label="Name"
                      dangerouslySetInnerHTML={{ __html: highlight(item.name) }}
                    />
                    <td
                      data-label="Email"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.email),
                      }}
                    />
                    <td
                      data-label="Message"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.message),
                      }}
                    />
                    <td data-label="Submitted At">
                      {new Date(item.submitted_at).toLocaleString()}
                    </td>
                  </>
                )}
                {type === "appointments" && (
                  <>
                    <td
                      data-label="Name"
                      dangerouslySetInnerHTML={{ __html: highlight(item.name) }}
                    />
                    <td
                      data-label="Email"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.email),
                      }}
                    />
                    <td data-label="Phone">{item.phone}</td>
                    <td data-label="Preferred Date">{item.preferred_date}</td>
                    <td data-label="Preferred Time">{item.preferred_time}</td>
                    <td data-label="Additional Info">
                      {item.additional_info || "—"}
                    </td>
                    <td data-label="Status">
                      <select
                        value={item.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(item.id, e.target.value)
                        }
                        className={`${styles.badge} ${
                          item.status === "Pending"
                            ? styles.pending
                            : item.status === "Confirmed"
                            ? styles.confirmed
                            : styles.completed
                        }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </td>
                    <td data-label="Submitted At">
                      {new Date(item.submitted_at).toLocaleString()}
                    </td>
                  </>
                )}
                {type === "feedbacks" && (
                  <>
                    <td
                      data-label="Name"
                      dangerouslySetInnerHTML={{ __html: highlight(item.name) }}
                    />
                    <td
                      data-label="Email"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.email),
                      }}
                    />
                    <td
                      data-label="Feedback"
                      dangerouslySetInnerHTML={{
                        __html: highlight(item.feedback),
                      }}
                    />
                    <td data-label="Submitted At">
                      {new Date(item.submitted_at).toLocaleString()}
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className={styles.adminContainer}>
      {/* KPI Cards */}
      <div className={styles.kpiContainer}>
        <div className={styles.kpiCard}>
          <FaEnvelope className={styles.kpiIcon} />
          <div>
            <h3>{messages.length}</h3>
            <p>Messages</p>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <FaCalendarAlt className={styles.kpiIcon} />
          <div>
            <h3>{appointments.length}</h3>
            <p>Appointments</p>
          </div>
        </div>
        <div className={styles.kpiCard}>
          <FaRegCommentDots className={styles.kpiIcon} />
          <div>
            <h3>{feedbacks.length}</h3>
            <p>Feedbacks</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={styles.tabs}>
        {["messages", "appointments", "feedbacks"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabButton} ${
              activeTab === tab ? styles.activeTab : ""
            }`}
            onClick={() => {
              setActiveTab(tab);
              setSearch("");
              setStatusFilter("All");
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tables */}
      {activeTab === "messages" && renderTable(messages, "messages")}
      {activeTab === "appointments" &&
        renderTable(appointments, "appointments")}
      {activeTab === "feedbacks" && renderTable(feedbacks, "feedbacks")}
    </div>
  );
}
