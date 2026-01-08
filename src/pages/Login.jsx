import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        { email, password }
      );

      login(
        { id: res.data.user.id, email: res.data.user.email, isAdmin: res.data.user.isAdmin },
        res.data.token
      );

      navigate("/admin/create-user"); // always admin dashboard
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Admin Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>

        <button onClick={handleLogin} style={styles.button}>
          Login
        </button>
      </div>
    </div>
  );
};

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
    maxWidth: "400px",
    padding: "40px",
    borderRadius: "20px",
    background: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    border: "1px solid #ddd",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "700",
    textAlign: "center",
    color: "#333",
    marginBottom: "30px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
    fontWeight: "500",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "20px",
  },
  label: {
    marginBottom: "5px",
    fontWeight: "500",
    color: "#555",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
    transition: "all 0.3s",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#0077b6",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "background 0.3s",
  },
};

