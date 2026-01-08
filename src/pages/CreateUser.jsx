import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function CreateUser() {
  const { token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const createUser = async () => {
    setError("");
    setSuccess("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/create-user`,
        { email, password },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccess(res.data.message);
      setEmail("");
      setPassword("");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Error creating user");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create New User</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            placeholder="user@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              ...styles.input,
              border: error && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "2px solid #f87171" : "none",
            }}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              ...styles.input,
              border: error && password.length < 6 ? "2px solid #f87171" : "none",
            }}
          />
        </div>

        <button onClick={createUser} style={styles.button}>
          + Create User
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#e0f7fa",
    fontFamily: "Verdana, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "450px",
    padding: "50px 40px",
    borderRadius: "25px",
    background: "#1e3a8a", // deep blue
    boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
    color: "#fff",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "30px",
    color: "#fbbf24", // amber
  },
  error: {
    color: "#f87171", // red
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "600",
  },
  success: {
    color: "#34d399", // green
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "600",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "25px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "600",
    color: "#fcd34d", // light amber
  },
  input: {
    padding: "12px 15px",
    borderRadius: "12px",
    outline: "none",
    fontSize: "16px",
    background: "#374151", // dark input
    color: "#fff",
    transition: "all 0.3s",
  },
  button: {
    width: "100%",
    padding: "15px 0",
    borderRadius: "15px",
    border: "none",
    background: "linear-gradient(90deg, #fbbf24, #f97316)", // gradient button
    color: "#1e3a8a",
    fontSize: "18px",
    fontWeight: "700",
    cursor: "pointer",
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    transition: "all 0.3s",
  },
};
