import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { token } = useAuth();
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    axios
      .get("http://localhost:5000/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUserData(res.data))
      .catch(() => navigate("/user-login"));
  }, [token, navigate]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }

  const hasPermission = (permName) =>
    userData.permissions.some((p) => p.name === permName);

  const handleAction = (permName, actionName) => {
    if (hasPermission(permName)) {
      alert(`✅ You have permission to ${actionName}!`);
    } else {
      alert(`❌ You do NOT have permission to ${actionName}`);
    }
  };

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Welcome, {userData.email}</h1>

      <div className="mb-4">
        <p>
          <strong>Roles:</strong>{" "}
          {userData.roles.length ? userData.roles.join(", ") : "No roles"}
        </p>
        <p>
          <strong>Team:</strong> {userData.team?.name || "No team"}
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Permissions</h2>
        <ul className="list-disc list-inside">
          {userData.permissions.map((p) => (
            <li key={p.name}>
              {p.name} ({p.scope})
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-x-4">
        <button
          onClick={() => handleAction("EDIT_PROFILE", "edit profile")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Edit Profile
        </button>

        <button
          onClick={() => handleAction("VIEW_USERS", "view users")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          View Users
        </button>

        <button
          onClick={() => handleAction("VIEW_AUDIT_LOGS", "view audit logs")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Audit Logs
        </button>
      </div>
    </div>
  );
};

export default UserDashboard;
