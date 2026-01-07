import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


export default function UserRoute({ children }) {
  const { user } = useAuth();

  console.log(user)

  if (!user) return <Navigate to="/user-login" />;
  if (user.isAdmin) return <Navigate to="/admin/create-user" />;

  return children;
}
