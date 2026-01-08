import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { token, user } = useAuth();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [teamUsers, setTeamUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    const fetchUserTeam = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const userData = res.data;

        if (userData.team) {
          setTeam(userData.team);

          const teamRes = await axios.get(
            `http://localhost:5000/api/user/teams/${userData.team._id}/users`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setTeamUsers(teamRes.data.filter(u => u._id !== user.id));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTeam();
  }, [token, user.id, navigate]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>Loading...</p>;

  const styles = {
    container: {
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "30px 20px",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      background: "#fff",
      padding: "20px",
      marginBottom: "20px",
      border: "1px solid #ddd",
    },
    heading: {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
      color: "#333",
    },
    text: {
      fontSize: "16px",
      color: "#555",
      marginBottom: "8px",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    listItem: {
      padding: "8px 0",
      borderBottom: "1px solid #eee",
    },
  };

  return (
    <div style={styles.container}>
      {/* User Profile Card */}
      <div style={styles.card}>
        <h2 style={styles.heading}>Your Profile</h2>
        <p style={styles.text}><strong>Email:</strong> {user.email}</p>
        <p style={styles.text}><strong>Role:</strong> {user.isAdmin ? "Admin" : "User"}</p>
      </div>

      {/* Team Info Card */}
      {team ? (
        <div style={styles.card}>
          <h2 style={styles.heading}>Your Team: {team.name}</h2>
          <h3 style={{ ...styles.text, fontWeight: "600" }}>Team Members:</h3>
          {teamUsers.length ? (
            <ul style={styles.list}>
              {teamUsers.map(u => (
                <li key={u._id} style={styles.listItem}>{u.email}</li>
              ))}
            </ul>
          ) : (
            <p style={styles.text}>No other members in your team.</p>
          )}
        </div>
      ) : (
        <div style={styles.card}>
          <h2 style={styles.heading}>You are not assigned to any team yet.</h2>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
