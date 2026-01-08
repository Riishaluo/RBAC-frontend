import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateUser from "./pages/CreateUser";
import UserLogin from "./pages/userLogin";
import UserDashboard from "./pages/userDashboard";
import AdminAuditLogs from "./pages/AdminAuditLog";
import AssignRoles from "./pages/AssignRoles";
// import Roles from "./pages/Role";
import Teams from "./pages/Teams";

import { AuthProvider } from "./context/AuthContext";

import AdminRoute from "./components/AdminProtectedRoute";
import UserRoute from "./components/UserProtectedRoute";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />

              </AdminRoute>
            }
          >
            <Route path="create-user" element={<CreateUser />} />
            <Route path="audit-logs" element={<AdminAuditLogs />} />
            {/* <Route path="roles" element={<Roles />} /> */}
            <Route path="assign-roles" element={<AssignRoles />} />
            <Route path="teams" element={<Teams />} />
          </Route>

          <Route path="/user-login" element={<UserLogin />} />

          <Route
            path="/userDashboard"
            element={
              <UserRoute>
                <UserDashboard />
              </UserRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
