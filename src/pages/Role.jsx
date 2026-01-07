import { useEffect, useState } from "react";
import axios from "axios";

export default function Roles() {
  const [name, setName] = useState("");
  const [roles, setRoles] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/roles", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setRoles(res.data));
  }, []);

  const createRole = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/admin/roles",
      { name },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setRoles([...roles, res.data]);
    setName("");
  };
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Role Management</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          placeholder="Enter role name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button style={styles.button} onClick={createRole}>
          Create Role
        </button>
      </div>

      <ul style={styles.list}>
        {roles.map((r) => (
          <li key={r._id} style={styles.listItem}>
            {r.name}
          </li>
        ))}
      </ul>
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
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "14px",
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
