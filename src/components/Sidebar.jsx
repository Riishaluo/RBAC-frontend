import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { name: "Create User", path: "/admin/create-user" },
    // { name: "Roles", path: "/admin/roles" },
    { name: "Assign Roles", path: "/admin/assign-roles" },
    { name: "Teams", path: "/admin/teams" },
    { name: "Audit Logs", path: "/admin/audit-logs" },
    { name: "go to user login", path: "/user-login" }
  ];

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.heading}>Admin Panel</h2>

      <ul style={styles.ul}>
        {links.map((link) => {
          const isActive = location.pathname === link.path;

          return (
            <li key={link.path} style={styles.li}>
              <Link
                to={link.path}
                style={{
                  ...styles.link,
                  ...(isActive ? styles.activeLink : {}),
                }}
              >
                {link.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

const styles = {
  sidebar: {
    width: "240px",
    minHeight: "100vh",
    background: "#1e40af",
    color: "#fff",
    padding: "30px 20px",
    boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
    borderTopRightRadius: "20px",
    borderBottomRightRadius: "20px",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "35px",
    color: "#fbbf24",
    textAlign: "center",
  },
  ul: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  li: {
    marginBottom: "18px",
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontWeight: "500",
    fontSize: "16px",
    padding: "12px 16px",
    display: "block",
    borderRadius: "12px",
    transition: "all 0.25s ease",
  },
  activeLink: {
    background: "#fbbf24",
    color: "#1e40af",
    fontWeight: "700",
  },
};
