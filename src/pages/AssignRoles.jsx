import { useEffect, useState } from "react";
import axios from "axios";

export default function AssignRoles() {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [teams, setTeams] = useState([]);

  const [userId, setUserId] = useState("");
  const [roleId, setRoleId] = useState("");
  const [teamId, setTeamId] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data));

    axios
      .get("http://localhost:5000/api/admin/roles", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setRoles(res.data));

    axios
      .get("http://localhost:5000/api/admin/teams", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTeams(res.data));
  }, []);

  const assignRole = async () => {
    if (!userId || !roleId) return alert("Select user and role");

    await axios.post(
      "http://localhost:5000/api/admin/assign-role",
      { userId, roleId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Role assigned");
  };

  const assignTeam = async () => {
    if (!userId || !teamId) return alert("Select user and team");

    await axios.post(
      "http://localhost:5000/api/admin/assign-team",
      { userId, teamId },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    alert("✅ Team assigned");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Assign Role & Team</h2>

      {/* USER */}
      <select
        style={styles.select}
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      >
        <option value="">Select User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.email}
          </option>
        ))}
      </select>

      {/* ROLE */}
      <select
        style={styles.select}
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
      >
        <option value="">Select Role</option>
        {roles.map((r) => (
          <option key={r._id} value={r._id}>
            {r.name}
          </option>
        ))}
      </select>

      <button style={styles.button} onClick={assignRole}>
        Assign Role
      </button>

      <hr style={styles.divider} />

      {/* TEAM */}
      <select
        style={styles.select}
        value={teamId}
        onChange={(e) => setTeamId(e.target.value)}
      >
        <option value="">Select Team</option>
        {teams.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      <button
        style={{ ...styles.button, backgroundColor: "#2563eb" }}
        onClick={assignTeam}
      >
        Assign Team
      </button>
    </div>
  );
}



const styles = {
  container: {
    maxWidth: "400px",
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

  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    backgroundColor: "#fff",
    cursor: "pointer",
  },

  button: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "#fff",
    fontSize: "14px",
    cursor: "pointer",
  },
};

