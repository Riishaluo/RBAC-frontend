import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminAuditLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/audit-logs", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => setLogs(res.data));
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Audit Logs</h2>

      <div style={styles.tableWrapper}>
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
              <tr key={log._id} style={styles.tr}>
                <td style={styles.td}>{log.actor?.email || "System"}</td>
                <td style={styles.td}>{log.action}</td>
                <td style={styles.td}>{log.targetType}</td>
                <td style={styles.td}>
                  {new Date(log.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


const styles = {
  container: {
    maxWidth: "900px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },

  tableWrapper: {
    overflowX: "auto",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "12px",
    textAlign: "left",
    backgroundColor: "#f1f5f9",
    color: "#334155",
    fontSize: "14px",
    borderBottom: "2px solid #e5e7eb",
  },

  tr: {
    borderBottom: "1px solid #e5e7eb",
  },

  td: {
    padding: "10px",
    fontSize: "13px",
    color: "#374151",
  },
};
