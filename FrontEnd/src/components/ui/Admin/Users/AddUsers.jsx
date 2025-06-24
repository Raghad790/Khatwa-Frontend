import React, { useState } from "react";
import styles from "./AddUserForm.module.css";

const AddUserForm = ({ onUserCreated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "student",
        avatar: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.message || "Failed to create user.");
            } else {
                onUserCreated?.(data);  // Optional callback
                setFormData({ name: "", email: "", password: "", role: "student", avatar: "" });
            }
        } catch (err) {
            setError("Error creating user. Please try again.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Create New User</h3>
            {error && <p className={styles.error}>{error}</p>}

            <input
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
            />
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
                <option value="admin">Admin</option>
            </select>
            <input
                name="avatar"
                type="url"
                placeholder="Avatar URL (optional)"
                value={formData.avatar}
                onChange={handleChange}
            />

            <button type="submit" disabled={loading}>
                {loading ? "Creating..." : "Add User"}
            </button>
        </form>
    );
};

export default AddUserForm;
