import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignRoles() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("");

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [token]);

  // Assign role
  const assign = async () => {
    if (!userId || !role) return alert("Please select user and role");

    try {
      await axios.put(
        `http://localhost:5000/api/admin/update-user-role/${userId}`,
        { role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Role updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update role");
    }
  };

  // ----------------- Styles -----------------
  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "450px",
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    heading: {
      fontSize: "24px",
      fontWeight: "700",
      textAlign: "center",
      color: "#333",
    },
    select: {
      padding: "12px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      fontSize: "16px",
      outline: "none",
      width: "100%",
    },
    button: {
      padding: "12px",
      borderRadius: "12px",
      border: "none",
      background: "#0077b6",
      color: "#fff",
      fontWeight: "600",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background 0.3s",
    },
    buttonHover: {
      background: "#005f87",
    },
    label: {
      fontWeight: "500",
      marginBottom: "5px",
      color: "#555",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Assign Role</h2>

        {/* User Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={styles.label}>Select User</label>
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select User --</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.email}
              </option>
            ))}
          </select>
        </div>

        {/* Role Selection */}
        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <label style={styles.label}>Select Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select Role --</option>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button
          onClick={assign}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.background = "#005f87")}
          onMouseOut={(e) => (e.target.style.background = "#0077b6")}
        >
          Assign
        </button>
      </div>
    </div>
  );
}
