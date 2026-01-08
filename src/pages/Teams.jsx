import { useEffect, useState } from "react";
import axios from "axios";

export default function Teams() {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/teams`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTeams(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTeams();
  }, [token]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data.filter(u => !u.isAdmin))
        setUsers(res.data.filter(u => !u.isAdmin));

      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, [token]);

  const createTeam = async () => {
    if (!name) return alert("Enter team name");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/teams`,
        { name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTeams([...teams, res.data]);
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to create team");
    }
  };

  const assignTeam = async () => {
    if (!selectedUser || !selectedTeam) return alert("Select user and team");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/assign-team`,
        { userId: selectedUser, teamId: selectedTeam },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Team assigned successfully");
      setSelectedUser("");
      setSelectedTeam("");
    } catch (err) {
      console.error(err);
      alert("Failed to assign team");
    }
  };

  const styles = {
    container: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "40px",
      background: "linear-gradient(135deg, #f0f4f8, #d9e2ec)",
      fontFamily: "Arial, sans-serif",
    },
    card: {
      width: "100%",
      maxWidth: "500px",
      background: "#fff",
      padding: "30px",
      borderRadius: "15px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      border: "1px solid #ddd",
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    heading: { fontSize: "24px", fontWeight: "700", color: "#333", textAlign: "center" },
    input: { padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "16px" },
    select: { padding: "12px", borderRadius: "10px", border: "1px solid #ccc", fontSize: "16px" },
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
    label: { fontWeight: "500", marginBottom: "5px", color: "#555" },
    section: { display: "flex", flexDirection: "column", gap: "10px" },
    list: { listStyle: "none", paddingLeft: "0" },
    listItem: { padding: "8px 0", borderBottom: "1px solid #eee" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Teams</h2>

        {/* Create Team */}
        <div style={styles.section}>
          <label style={styles.label}>Team Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Enter team name"
          />
          <button onClick={createTeam} style={styles.button}>Create Team</button>
        </div>

        <hr />

        {/* Assign Team */}
        <div style={styles.section}>
          <label style={styles.label}>Select User</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select User --</option>
            {users.map(u => <option key={u._id} value={u._id}>{u.email}</option>)}
          </select>

          <label style={styles.label}>Select Team</label>
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            style={styles.select}
          >
            <option value="">-- Select Team --</option>
            {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>

          <button onClick={assignTeam} style={styles.button}>Assign Team</button>
        </div>

        <hr />

        {/* Team List */}
        <h3 style={{ marginTop: "10px" }}>Existing Teams</h3>
        <ul style={styles.list}>
          {teams.map(t => <li key={t._id} style={styles.listItem}>{t.name}</li>)}
        </ul>
      </div>
    </div>
  );
}
