import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user } = useAuth();

  console.log(user)

  if (!user) {
    return <Navigate to="/admin-login" />;
  }

  if (!user.isAdmin) {
    return <Navigate to="/userDashboard" />;
  }

  return children;
}
