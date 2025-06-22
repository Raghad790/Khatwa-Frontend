import React, { useState, useEffect } from 'react';
import styles from './EditLessons.module.css';
import QuizEditor from './QuizEditor';
import AssignmentEditor from './AssignmentEditor';

const LessonEditor = ({ lessonId, moduleId, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        order: '',
        duration: 0,
        content_type: 'video',
        content_url: '',
        content_text: '',
        is_free: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Load lesson data if editing existing lesson
    useEffect(() => {
        if (!lessonId) return;

        const fetchLesson = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/lessons/${lessonId}`);
                const data = await response.json();
                if (data.success) {
                    setFormData({
                        title: data.data.title,
                        order: data.data.order,
                        duration: data.data.duration,
                        content_type: data.data.content_type,
                        content_url: data.data.content_url || '',
                        content_text: data.data.content_text || '',
                        is_free: data.data.is_free
                    });
                }
            } catch (error) {
                setError('Failed to load lesson data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Prepare the payload based on content type
            const payload = {
                title: formData.title,
                order: parseInt(formData.order),
                duration: parseInt(formData.duration),
                content_type: formData.content_type,
                is_free: formData.is_free
            };

            // Only include content fields relevant to the selected type
            switch (formData.content_type) {
                case 'video':
                    payload.content_url = formData.content_url;
                    break;
                case 'text':
                    payload.content_text = formData.content_text;
                    break;
                case 'quiz':
                case 'assignment':
                    // These types don't need content_url or content_text
                    break;
            }

            const url = lessonId ? `/api/lessons/${lessonId}` : '/api/lessons';
            const method = lessonId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...payload,
                    module_id: moduleId
                })
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message || 'Failed to save lesson');
            }

            onSave();
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const renderContentEditor = () => {
        switch (formData.content_type) {
            case 'quiz':
                return <QuizEditor lessonId={lessonId} />;
            case 'assignment':
                return <AssignmentEditor lessonId={lessonId} />;
            case 'text':
                return (
                    <div className={styles.formGroup}>
                        <label>Content Text</label>
                        <textarea
                            name="content_text"
                            value={formData.content_text}
                            onChange={handleChange}
                            rows={10}
                            required
                        />
                    </div>
                );
            case 'video':
                return (
                    <div className={styles.formGroup}>
                        <label>Video URL</label>
                        <input
                            type="text"
                            name="content_url"
                            value={formData.content_url}
                            onChange={handleChange}
                            placeholder="Enter video URL"
                            required
                        />
                    </div>
                );
            default:
                return null;
        }
    };
    return (
        <div className={styles.lessonEditor}>
            <h3>{lessonId ? 'Edit Lesson' : 'Create New Lesson'}</h3>

            <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Order</label>
                        <input
                            type="number"
                            name="order"
                            value={formData.order}
                            onChange={handleChange}
                            required
                            min="1"
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Duration (minutes)</label>
                        <input
                            type="number"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                            min="0"
                        />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Content Type</label>
                    <select
                        name="content_type"
                        value={formData.content_type}
                        onChange={handleChange}
                        required
                    >
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="quiz">Quiz</option>
                        <option value="assignment">Assignment</option>
                    </select>
                </div>

                {renderContentEditor()}

                <div className={styles.formGroup}>
                    <label>
                        <input
                            type="checkbox"
                            name="is_free"
                            checked={formData.is_free}
                            onChange={handleChange}
                        />
                        Free Lesson
                    </label>
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.buttonGroup}>
                    <button
                        type="button"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Lesson'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LessonEditor;