import React, { useEffect, useState } from "react";
import Header from "../../../components/layout/AdminLayout/header";
import Footer from "../../../components/layout/AdminLayout/footer";
import AdminSidebar from "../../../components/ui/SideBar/AdminSideBar";
import styles from "./AdminCategoriesManager.module.css";

const AdminCategoriesManager = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Form states for create/edit
    const [formMode, setFormMode] = useState("create");
    const [formData, setFormData] = useState({ id: null, name: "" });
    const [formError, setFormError] = useState(null);
    const [formLoading, setFormLoading] = useState(false);

    // Fetch all categories
    const fetchCategories = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch("/api/categories", {
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });
            if (!res.ok) throw new Error("Failed to fetch categories");
            const json = await res.json();
            setCategories(json.data || json);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Create or update category
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        setFormLoading(true);

        try {
            const url =
                formMode === "create"
                    ? "/api/categories"
                    : `/api/categories/${formData.id}`;
            const method = formMode === "create" ? "POST" : "PUT";

            const res = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name: formData.name.trim() }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to save category");
            }

            setFormData({ id: null, name: "" });
            setFormMode("create");
            fetchCategories();
        } catch (err) {
            setFormError(err.message);
        } finally {
            setFormLoading(false);
        }
    };

    // Edit button handler
    const handleEditClick = (category) => {
        setFormMode("edit");
        setFormData({ id: category.id, name: category.name });
        setFormError(null);
    };

    // Cancel editing
    const handleCancelEdit = () => {
        setFormMode("create");
        setFormData({ id: null, name: "" });
        setFormError(null);
    };

    // Delete category
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) {
            return;
        }
        try {
            const res = await fetch(`/api/categories/${id}`, {
                method: "DELETE",
                credentials: "include",
            });
            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.message || "Failed to delete category");
            }
            fetchCategories();
        } catch (err) {
            alert("Error deleting category: " + err.message);
        }
    };

    // Responsive table headers for mobile
    const getTableCell = (label, value) => {
        return <td data-label={label}>{value}</td>;
    };

    return (
        <>
            <Header />
            <AdminSidebar />
            <div className={styles.container}>
                <h1>Manage Categories</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formRow}>
                        <label htmlFor="categoryName">
                            Category Name:
                        </label>
                        <input
                            id="categoryName"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={formLoading} className={styles.submitBtn}>
                        {formMode === "create" ? "Add Category" : "Update Category"}
                    </button>
                    {formMode === "edit" && (
                        <button
                            type="button"
                            onClick={handleCancelEdit}
                            className={styles.cancelBtn}
                        >
                            Cancel
                        </button>
                    )}
                    {formError && <div className={styles.errorMessage}>{formError}</div>}
                </form>

                {loading ? (
                    <p>Loading categories...</p>
                ) : error ? (
                    <p style={{ color: "red" }}>Error: {error}</p>
                ) : categories.length === 0 ? (
                    <p>No categories found.</p>
                ) : (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Created At</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map(({ id, name, created_at }) => (
                                <tr key={id}>
                                    {getTableCell("ID", id)}
                                    {getTableCell("Name", name)}
                                    {getTableCell("Created At", new Date(created_at).toLocaleDateString())}
                                    <td className={styles.actions} data-label="Actions">
                                        <button
                                            onClick={() => handleEditClick({ id, name })}
                                            className={styles.editBtn}
                                            type="button"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(id)}
                                            className={styles.deleteBtn}
                                            type="button"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AdminCategoriesManager;