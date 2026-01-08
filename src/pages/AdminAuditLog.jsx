import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/audit-logs", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setLogs(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLogs();
  }, [token]);

  const styles = {
    container: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
      fontFamily: "Arial, sans-serif",
      padding: "40px",
      display: "flex",
      justifyContent: "center",
    },
    card: {
      width: "100%",
      maxWidth: "900px",
      background: "#fff",
      borderRadius: "15px",
      padding: "30px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: "1px solid #ddd",
    },
    heading: {
      fontSize: "28px",
      fontWeight: "700",
      marginBottom: "20px",
      color: "#333",
      textAlign: "center",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },
    th: {
      backgroundColor: "#0077b6",
      color: "#fff",
      padding: "12px",
      textAlign: "left",
      borderBottom: "2px solid #005f87",
      borderRadius: "8px 8px 0 0",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #eee",
      color: "#555",
    },
    row: {
      transition: "background 0.3s",
    },
    rowHover: {
      backgroundColor: "#f1f7fb",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Audit Logs</h2>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Who</th>
              <th style={styles.th}>Action</th>
              <th style={styles.th}>Target</th>
              <th style={styles.th}>Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr
                key={log._id}
                style={styles.row}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f7fb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <td style={styles.td}>{log.actor?.email || "N/A"}</td>
                <td style={styles.td}>{log.action}</td>
                <td style={styles.td}>{log.targetType}</td>
                <td style={styles.td}>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <p style={{ textAlign: "center", color: "#555", marginTop: "20px" }}>
            No audit logs found.
          </p>
        )}
      </div>
    </div>
  );
}
