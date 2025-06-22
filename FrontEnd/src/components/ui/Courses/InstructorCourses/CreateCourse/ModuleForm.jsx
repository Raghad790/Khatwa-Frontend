import React, { useState } from 'react';
import styles from './ModuleForm.module.css';

const ModuleForm = ({ courseId, onNext }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [order, setOrder] = useState(1);
    const [modules, setModules] = useState([]);
    const [error, setError] = useState('');

    const resetFields = () => {
        setTitle('');
        setDescription('');
        setOrder(modules.length + 1); // next order number
        setError('');
    };

    const handleAddModule = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!title.trim() || !description.trim()) {
            setError('Title and description are required.');
            return;
        }
        if (!order || order <= 0) {
            setError('Order must be a positive number.');
            return;
        }

        try {
            const res = await fetch('/api/modules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    course_id: courseId,
                    title: title.trim(),
                    description: description.trim(),
                    order,
                }),
            });

            const data = await res.json();

            if (!data.success) throw new Error(data.message || 'Failed to add module');

            setModules([...modules, data.data]); // add newly created module
            resetFields();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Add Modules to Course</h2>

            <form onSubmit={handleAddModule} className={styles.form}>
                <input
                    type="text"
                    placeholder="Module Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />

                <textarea
                    placeholder="Module Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className={styles.textarea}
                    required
                />

                <input
                    type="number"
                    placeholder="Order"
                    value={order}
                    min={1}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className={styles.input}
                    required
                />

                {error && <p className={styles.error}>{error}</p>}

                <button type="submit" className={styles.button}>
                    Add Module
                </button>
            </form>

            {modules.length > 0 && (
                <>
                    <h3>Modules Added</h3>
                    <ul className={styles.moduleList}>
                        {modules.map((mod) => (
                            <li key={mod.id} className={styles.moduleItem}>
                                <strong>{mod.order}. {mod.title}</strong> - {mod.description}
                            </li>
                        ))}
                    </ul>

                    <button
                        className={styles.continueBtn}
                        onClick={() => onNext(modules)}
                    >
                        Continue to Add Lessons
                    </button>
                </>
            )}

            {modules.length === 0 && (
                <p>Please add at least one module to continue.</p>
            )}
        </div>
    );
};

export default ModuleForm;
