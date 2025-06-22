import React, { useState } from 'react';
import ModuleSelector from './ModuleSelector';
import LessonManager from './LessonManager';
import styles from './EditLessons.module.css';

const EditLessons = ({ courseId }) => {
    const [selectedModuleId, setSelectedModuleId] = useState(null);

    return (
        <div className={styles.container}>
            <h2>Manage Lessons</h2>
            <div className={styles.moduleSelectorWrapper}>
                <ModuleSelector
                    courseId={courseId}
                    onModuleSelect={setSelectedModuleId}
                />
            </div>

            {selectedModuleId && (
                <div className={styles.lessonManagerWrapper}>
                    <LessonManager
                        moduleId={selectedModuleId}
                        key={selectedModuleId} // Important for resetting state
                    />
                </div>
            )}
        </div>
    );
};

export default EditLessons;