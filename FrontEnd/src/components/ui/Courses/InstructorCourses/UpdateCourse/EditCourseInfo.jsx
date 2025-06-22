import React, { useState, useEffect } from 'react';
import styles from './EditCourseInfo.module.css';
import { useAuth } from '../../../../../hooks/Auth/userAuth'; // adjust the path as needed

const EditCourseInfo = ({ courseId }) => {
    const { user } = useAuth(); // user object with id inside

    const [form, setForm] = useState({
        title: '',
        description: '',
        category_id: '', // stores category ID as string initially
        thumbnail_url: '',
    });
    const [categories, setCategories] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    
    // Fetch categories from backend
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (data.success) {
                    setCategories(data.data);
                } else {
                    setMessage('Failed to load categories.');
                }
            } catch {
                setMessage('Network error loading categories.');
            }
        };
        fetchCategories();
    }, []);

    // Fetch course data by courseId
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const res = await fetch(`/api/course/${courseId}`);
                const data = await res.json();
                if (data.success) {
                    setForm({
                        title: data.data.title || '',
                        description: data.data.description || '',
                        category_id: data.data.category_id ? String(data.data.category_id) : '',
                        thumbnail_url: data.data.thumbnail_url || '',
                    });
                } else {
                    setMessage('Failed to load course details.');
                }
            } catch {
                setMessage('Network error loading course details.');
            }
        };
        fetchCourse();
    }, [courseId]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);

        if (!user?.id) {
            setMessage('User authentication required.');
            setLoading(false);
            return;
        }

        try {
            const payload = {
                ...form,
                category_id: Number(form.category_id) || null,
                instructor_id: user.id,  // include instructor_id here
            };

            const res = await fetch(`/api/course/${courseId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setMessage('Course updated successfully.');
            } else {
                setMessage(data.message || 'Update failed.');
            }
        } catch {
            setMessage('Update failed due to network error.');
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <p>Checking authentication...</p>;

    if (!user) return <p>Please log in to create a course.</p>;
    return (
        <form className={styles.form} onSubmit={handleSubmit} aria-live="polite" aria-atomic="true">
            <h2>Edit Course Info</h2>

            <label htmlFor="title">Title</label>
            <input
                id="title"
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                required
            />

            <label htmlFor="description">Description</label>
            <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                required
            />

            <label htmlFor="category_id">Category</label>
            <select
                id="category_id"
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                className={styles.select}
                required
            >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                ))}
            </select>

            <label htmlFor="thumbnail_url">Thumbnail URL</label>
            <input
                id="thumbnail_url"
                type="url"
                name="thumbnail_url"
                value={form.thumbnail_url}
                onChange={handleChange}
                placeholder="Thumbnail URL"
            />

            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Changes'}
            </button>

            {message && <p className={styles.message}>{message}</p>}
        </form>
    );
};

export default EditCourseInfo;
