import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CourseModulesPage.module.css';
import ModuleItem from '../modules/ModuleItem';

const CourseModulesPage = () => {
    const { courseId } = useParams();
    const [modules, setModules] = useState([]);

    useEffect(() => {
        const fetchModules = async () => {
            try {
                const response = await fetch(`/api/courses/${courseId}/modules`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                if (data?.success && Array.isArray(data.data)) {
                    setModules(data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchModules();
    }, [courseId]);

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>📚 Course Modules</h2>

            {modules.length === 0 ? (
                <p className={styles.emptyMessage}>No modules found for this course.</p>
            ) : (
                <div className={styles.moduleCards}>
                    {modules.map((module) => (
                        <div key={module.id} className={styles.moduleCard}>
                            <ModuleItem module={module} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseModulesPage;
