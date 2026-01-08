import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserLogin = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/auth/user-login`,
                { email, password }
            );

            login(
                { id: res.data.user.id, email: res.data.user.email, isAdmin: res.data.user.isAdmin },
                res.data.token
            );

            navigate("/userDashboard"); // always user dashboard
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };


    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>User Login</h2>

                {error && <p style={styles.error}>{error}</p>}

                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label} htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={styles.input}
                        />
                    </div>

                    <button type="submit" style={styles.button}>
                        Login
                    </button>
                </form>
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
        background: "linear-gradient(120deg, #e0f7fa, #80deea)",
        fontFamily: "Arial, sans-serif",
    },
    card: {
        width: "100%",
        maxWidth: "400px",
        background: "#fff",
        padding: "40px",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd",
    },
    heading: {
        fontSize: "28px",
        fontWeight: "700",
        color: "#333",
        textAlign: "center",
        marginBottom: "30px",
    },
    error: {
        color: "red",
        textAlign: "center",
        marginBottom: "20px",
        fontWeight: "500",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    inputGroup: {
        display: "flex",
        flexDirection: "column",
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
        padding: "12px 0",
        borderRadius: "12px",
        border: "none",
        background: "#00acc1",
        color: "#fff",
        fontWeight: "600",
        fontSize: "16px",
        cursor: "pointer",
        transition: "background 0.3s",
    },
    footer: {
        marginTop: "20px",
        textAlign: "center",
        color: "#555",
        fontSize: "14px",
    },
    link: {
        color: "#00acc1",
        textDecoration: "none",
        fontWeight: "500",
    },
};

export default UserLogin;