import { useEffect, useState } from "react";
import axios from "axios";

export default function Teams() {
  const [name, setName] = useState("");
  const [teams, setTeams] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/teams", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setTeams(res.data));
  }, []);

  const createTeam = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/teams",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setTeams([...teams, res.data]);
    setName("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Team Management</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter team name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button style={styles.button} onClick={createTeam}>
          Create Team
        </button>
      </div>

      <ul style={styles.list}>
        {teams.map((t) => (
          <li key={t._id} style={styles.listItem}>
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );

}


const styles = {
  container: {
    maxWidth: "420px",
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

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none",
  },

  button: {
    padding: "10px 15px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },

  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },

  listItem: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "#f4f4f5",
    marginBottom: "8px",
    textAlign: "center",
    fontWeight: "500",
  },
};
