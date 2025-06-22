import React, { useState, useEffect } from "react";
import { MdSettings } from "react-icons/md";
import styles from "./Settings.module.css"; // Create this CSS module
import { useAuth } from "../../../hooks/Auth/userAuth";

function Settings() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
    });
    const { user } = useAuth()
    const [preferences, setPreferences] = useState({
        darkMode: false,
        notifications: true,
    });

    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchSettings() {
            try {
                const data = {
                    name: user?.name || null,
                    email: user?.email || null ,
                    darkMode: false,
                    notifications: true,
                };
                setProfile({ name: data.name, email: data.email });
                setPreferences({
                    darkMode: data.darkMode,
                    notifications: data.notifications,
                });
            } catch {
                setError("Failed to load settings.");
            }
        }
        fetchSettings();
    }, []);

    const handleProfileChange = (e) => {
        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    const handlePreferenceChange = (e) => {
        const { name, checked } = e.target;
        setPreferences((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        setError(null);
        setStatus(null);

        try {
            // Replace with your API call to save settings
            // await api.saveSettings({ profile, preferences });

            // Mock success response
            setStatus("Settings saved successfully.");
        } catch {
            setError("Failed to save settings.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <MdSettings size={32} />
                <h1>Settings</h1>
            </header>

            <form className={styles.form} onSubmit={handleSave}>
                <section className={styles.section}>
                    <h2>Profile Information</h2>
                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleProfileChange}
                            required
                            disabled={isSaving}
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleProfileChange}
                            required
                            disabled={isSaving}
                        />
                    </label>
                </section>

                <section className={styles.section}>
                    <h2>Preferences</h2>
                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="darkMode"
                            checked={preferences.darkMode}
                            onChange={handlePreferenceChange}
                            disabled={isSaving}
                        />
                        Enable Dark Mode
                    </label>

                    <label className={styles.checkboxLabel}>
                        <input
                            type="checkbox"
                            name="notifications"
                            checked={preferences.notifications}
                            onChange={handlePreferenceChange}
                            disabled={isSaving}
                        />
                        Receive Email Notifications
                    </label>
                </section>

                {error && <p className={styles.error}>{error}</p>}
                {status && <p className={styles.success}>{status}</p>}

                <button type="submit" disabled={isSaving} className={styles.saveButton}>
                    {isSaving ? "Saving..." : "Save Settings"}
                </button>
            </form>
        </div>
    );
}

export default Settings;
