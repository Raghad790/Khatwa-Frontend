import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./UserProfile.module.css";

const ViewUserProfile = () => {
    const { id } = useParams();
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

    if (!user) return <div>Loading user profile...</div>;

    return (
        <div className={styles.profileContainer}>
            <h2>{user.name}'s Profile</h2>
            <img src={user.avatar} alt="Img" />
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            <p>
                <strong>Status:</strong>{" "}
                <span className={user.is_active ? styles.active : styles.inactive}>
                    {user.is_active ? "Active" : "Inactive"}
                </span>
            </p>

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
                            // Optionally redirect:
                            window.location.href = "/admin/users";
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

            {user.avatar && <img src={user.avatar} alt={`${user.name}'s avatar`} />}
        </div>
    );
};

export default ViewUserProfile;
