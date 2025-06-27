import React, { useEffect, useState } from "react";

const AdminUsageReport = () => {
    const [report, setReport] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const res = await fetch("/api/admin/reports/usage", {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!res.ok) {
                    throw new Error(`Error fetching report: ${res.statusText}`);
                }

                const json = await res.json();

                if (json.success) {
                    setReport(json.data);
                } else {
                    throw new Error(json.message || "Failed to fetch report");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, []);

    if (loading) return <p style={{ textAlign: "center" }}>Loading system usage report...</p>;
    if (error) return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
    if (!report) return <p style={{ textAlign: "center" }}>No report data available.</p>;

    // Icon SVGs for each metric (can be replaced by font-icons or libraries)
    const icons = {
        users: (
            <svg width="24" height="24" fill="#4A90E2" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        ),
        activeUsers: (
            <svg width="24" height="24" fill="#27AE60" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
            </svg>
        ),
        courses: (
            <svg width="24" height="24" fill="#F5A623" viewBox="0 0 24 24">
                <path d="M4 6h16v12H4z" opacity=".3" /><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V6h16v12z" />
            </svg>
        ),
        published: (
            <svg width="24" height="24" fill="#2D9CDB" viewBox="0 0 24 24">
                <path d="M9 16.17l-3.5-3.5-1.42 1.42L9 19 20.5 7.5 19.08 6.08z" />
            </svg>
        ),
        pending: (
            <svg width="24" height="24" fill="#EB5757" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 14h-1v-4h2v4zm0-6h-1V6h2v4z" />
            </svg>
        ),
    };

    return (
        <div style={{
            maxWidth: 600,
            margin: "2rem auto",
            background: "white",
            borderRadius: 12,
            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
            padding: "2rem",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
            color: "#333"
        }}>
            <h2 style={{
                background: "linear-gradient(90deg, #1E40AF, #2563EB)",
                color: "white",
                padding: "1rem 2rem",
                borderRadius: "8px",
                textAlign: "center",
                marginBottom: "2rem",
                fontWeight: "700"
            }}>
                System Usage Report
            </h2>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {[
                    { label: "Total Users", value: report.totalUsers, icon: icons.users },
                    { label: "Active Users (Last 30 Days)", value: report.activeUsersLast30Days, icon: icons.activeUsers },
                    { label: "Total Courses", value: report.totalCourses, icon: icons.courses },
                    { label: "Published Courses", value: report.publishedCourses, icon: icons.published },
                    { label: "Pending Course Approvals", value: report.pendingCourses, icon: icons.pending },
                ].map(({ label, value, icon }) => (
                    <li
                        key={label}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            background: "#f9fafb",
                            marginBottom: "1rem",
                            borderRadius: "8px",
                            padding: "1rem 1.5rem",
                            boxShadow: "inset 0 0 8px rgba(0,0,0,0.03)",
                            fontSize: "1.1rem",
                            fontWeight: "600"
                        }}
                    >
                        <div style={{ marginRight: "1rem" }}>{icon}</div>
                        <span style={{ flex: 1 }}>{label}:</span>
                        <span style={{ fontWeight: "700", color: "#111" }}>{value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminUsageReport;
