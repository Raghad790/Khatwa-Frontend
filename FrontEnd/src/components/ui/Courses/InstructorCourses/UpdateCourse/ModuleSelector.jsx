import React, { useEffect, useState } from 'react';
import styles from './EditLessons.module.css';

const ModuleSelector = ({ courseId, onModuleSelect }) => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(`/api/courses/${courseId}/modules`);
                const data = await response.json();
                if (data.success) {
                    setModules(data.data);
                }
            } catch (error) {
                console.error("Error fetching modules:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchModules();
    }, [courseId]);

    if (loading) return <div>Loading modules...</div>;

    return (
        <div className={styles.moduleSelector}>
            <label>Select Module:</label>
            <select
                onChange={(e) => onModuleSelect(e.target.value)}
                defaultValue=""
            >
                <option value="" disabled>Select a module</option>
                {modules.map(module => (
                    <option key={module.id} value={module.id}>
                        {module.title}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ModuleSelector;