import React, { useEffect, useState } from "react";
import styles from "./AdminUsersTable.module.css";
import { useNavigate } from "react-router-dom";

const AdminUsersTable = () => {
  const [users, setUsers] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const navigate = useNavigate();
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();

      if (Array.isArray(data)) {
        const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
        setUsers(sortedUsers);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.log(err);
      setUsers([]);
    }
  };

  const filteredUsers = users
    .filter(({ name, email, role }) => {
      const matchesSearch =
        name.toLowerCase().includes(searchTerm) ||
        email.toLowerCase().includes(searchTerm);
      const matchesRole = selectedRole === "all" || role === selectedRole;
      return matchesSearch && matchesRole;
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingId(userId);
    const user = users.find((u) => u.id === userId);
    if (!user) return;

    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h2 className={styles.title}>All Registered Users</h2>
        <button
          className={styles.addUserBtn}
          onClick={() => navigate("/admin/users/add")}
        >
          + Add User
        </button>
      </div>
      <div className={styles.filters}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          className={styles.searchInput}
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className={styles.roleFilter}
        >
          <option value="all">All Roles</option>
          <option value="student">Student</option>
          <option value="instructor">Instructor</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Date Joined</th>
              <th>Status</th>
              <th>Active?</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(
              ({ id, name, email, role, created_at, is_active }, index) => (
                <tr key={id}>
                  <td>{index + 1}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>
                    <select
                      value={role}
                      onChange={(e) => handleRoleChange(id, e.target.value)}
                      disabled={updatingId === id}
                      className={styles.roleSelect}
                    >
                      <option value="student">Student</option>
                      <option value="instructor">Instructor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{new Date(created_at).toLocaleDateString()}</td>
                  <td>
                    {updatingId === id ? (
                      <span className={styles.updating}>Updating...</span>
                    ) : (
                      <span className={styles.checkIcon}>✓</span>
                    )}
                  </td>
                  <td>
                    <span
                      className={is_active ? styles.active : styles.inactive}
                    >
                      {is_active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => navigate(`/admin/users/${id}`)}
                      className={styles.viewBtn}
                    >
                      View
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsersTable;
