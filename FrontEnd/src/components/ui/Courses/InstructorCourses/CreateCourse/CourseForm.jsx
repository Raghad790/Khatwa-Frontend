import React, { useState, useEffect } from 'react';
import styles from './CourseForm.module.css';
import { useAuth } from '../../../../../hooks/Auth/userAuth'; // adjust the path as needed

const CourseForm = ({ onNext }) => {
    const { user } = useAuth(); // user object with id inside
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [thumbnailUrl, setThumbnailUrl] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('/api/categories');
                const data = await res.json();
                if (res.ok && data.success) {
                    setCategories(data.data || []);
                } else {
                    throw new Error(data.message || 'Failed to load categories');
                }
            } catch (err) {
                console.error('Error loading categories:', err);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchCategories();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !category) {
            setError('All fields are required.');
            return;
        }

        if (!user?.id) {
            setError('User authentication required.');
            return;
        }

        setLoading(true);

        try {
            const res = await fetch('/api/course', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    description,
                    instructor_id: user.id,       // Send authenticated user's ID here
                    category_id: category,
                    thumbnail_url: thumbnailUrl.trim() || null,
                }),
            });

            const data = await res.json();
            if (!data.success) throw new Error(data.message);
            setError('');
            onNext(data.data.id);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <p>Checking authentication...</p>;

    if (!user) return <p>Please log in to create a course.</p>;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>Add New Course</h2>

            <input
                type="text"
                placeholder="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
            />

            <textarea
                placeholder="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
            />

            <div className={styles.selectWrapper}>
                {loadingCategories ? (
                    <p>Loading categories...</p>
                ) : (
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className={styles.select}
                        required
                    >
                        <option value="" disabled>
                            Select Category
                        </option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>

            <input
                type="text"
                placeholder="Thumbnail URL"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className={styles.input}
            />

            {error && <p className={styles.error}>{error}</p>}

            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? 'Saving...' : 'Save & Continue'}
            </button>
        </form>
    );
};

export default CourseForm;
