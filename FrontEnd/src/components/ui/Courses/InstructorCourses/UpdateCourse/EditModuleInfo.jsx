import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './EditModules.module.css';

const EditModules = ({ courseId, onModuleSelect, selectedModuleId, onModulesChange }) => {
    const [modules, setModules] = useState([]);
    const [editingModule, setEditingModule] = useState(null);
    const [form, setForm] = useState({
        title: '',
        description: '',
        order: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/courses/${courseId}/modules`);
                const data = await res.json();

                if (data.success) {
                    setModules(data.data);
                } else {
                    setError(data.message || 'Failed to load modules');
                }
            } catch (err) {
                setError("Error fetching modules");
                console.error("Error fetching modules:", err);
            } finally {
                setIsLoading(false);
            }
        };

        if (courseId) fetchModules();
    }, [courseId]);

    const startEditing = (module) => {
        setEditingModule(module.id);
        setForm({
            title: module.title,
            description: module.description || '',
            order: module.order.toString()
        });
        setError(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await fetch(`/api/modules/${editingModule}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: form.title,
                    description: form.description,
                    order: parseInt(form.order, 10),
                    course_id: courseId,
                }),
            });

            const data = await res.json();

            if (data.success) {
                const updated = modules.map(m =>
                    m.id === editingModule ? data.data : m
                );
                setModules(updated);
                setEditingModule(null);
                if (onModulesChange) onModulesChange();
            } else {
                setError(data.message || 'Failed to update module');
            }
        } catch (err) {
            setError("Error updating module");
            console.error("Error updating module:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const cancelEditing = () => {
        setEditingModule(null);
        setError(null);
    };

    return (
        <aside className={styles.sidebar}>
            <h3>Modules</h3>
            {error && <div className={styles.error}>{error}</div>}
            {isLoading && !modules.length && <div>Loading modules...</div>}

            <ul className={styles.lessonList}>
                {modules.sort((a, b) => a.order - b.order).map(m => (
                    <li
                        key={m.id}
                        className={`${styles.lessonItem} ${selectedModuleId === m.id ? styles.selected : ''}`}
                        onClick={() => onModuleSelect && onModuleSelect(m.id)}
                    >
                        {editingModule === m.id ? (
                            <form onSubmit={handleSubmit} className={styles.moduleEditForm}>
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        required
                                        disabled={isLoading}
                                    />
                                </label>

                                <label>
                                    Description:
                                    <textarea
                                        name="description"
                                        value={form.description}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </label>

                                <label>
                                    Order:
                                    <input
                                        type="number"
                                        name="order"
                                        value={form.order}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        disabled={isLoading}
                                    />
                                </label>

                                <div className={styles.formActions}>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? 'Saving...' : 'Save'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={cancelEditing}
                                        disabled={isLoading}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <>
                                <span>{m.order}. {m.title}</span>
                                {m.description && <small>{m.description}</small>}
                                <button
                                    className={styles.editBtn}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        startEditing(m);
                                    }}
                                    disabled={isLoading}
                                >
                                    ✏️
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </aside>
    );
};

EditModules.propTypes = {
    courseId: PropTypes.number.isRequired,
    onModuleSelect: PropTypes.func.isRequired,
    selectedModuleId: PropTypes.number,
    onModulesChange: PropTypes.func
};

export default EditModules;