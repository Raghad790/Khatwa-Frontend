import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "./UserProfile.module.css";

const ViewUserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/users/${id}`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("Failed to fetch user:", err);
            }
        };
        fetchUser();
    }, [id]);

    if (!user) return <div className={styles.loading}>Loading user profile...</div>;

    return (
        <div className={styles.profileContainer}>
            <div className={styles.avatarSection}>
                <img
                    src={user.avatar || "/default-avatar.png"}
                    alt={`${user.name}'s avatar`}
                    className={styles.avatar}
                />
            </div>
            <h2 className={styles.profileTitle}>{user.name}'s Profile</h2>
            <div className={styles.profileInfo}>
                <p>
                    <span className={styles.label}>Email:</span>
                    <span>{user.email}</span>
                </p>
                <p>
                    <span className={styles.label}>Role:</span>
                    <span className={styles.role}>{user.role}</span>
                </p>
                <p>
                    <span className={styles.label}>Status:</span>
                    <span className={user.is_active ? styles.active : styles.inactive}>
                        {user.is_active ? "Active" : "Inactive"}
                    </span>
                </p>
            </div>
            <div className={styles.actions}>
                <button
                    onClick={async () => {
                        setUpdatingStatus(true);
                        try {
                            const res = await fetch(`/api/admin/users/${user.id}/status`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({ is_active: !user.is_active }),
                            });
                            if (res.ok) {
                                setUser((prev) => ({ ...prev, is_active: !prev.is_active }));
                            }
                        } catch (err) {
                            console.error("Error updating status:", err);
                        } finally {
                            setUpdatingStatus(false);
                        }
                    }}
                    disabled={updatingStatus}
                    className={styles.statusBtn}
                >
                    {user.is_active ? "Deactivate" : "Activate"}
                </button>
                <button
                    onClick={async () => {
                        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
                        if (!confirmDelete) return;

                        try {
                            const res = await fetch(`/api/users/${user.id}`, {
                                method: "DELETE",
                            });
                            if (res.ok) {
                                alert("User deleted successfully.");
                                navigate("/admin/users");
                            } else {
                                alert("Failed to delete user.");
                            }
                        } catch (err) {
                            console.error("Error deleting user:", err);
                        }
                    }}
                    className={styles.deleteBtn}
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default ViewUserProfile;