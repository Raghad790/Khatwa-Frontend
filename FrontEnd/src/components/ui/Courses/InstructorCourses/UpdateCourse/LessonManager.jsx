import styles from './EditLessons.module.css';
import LessonList from './LessonList';
import LessonEditor from './LessonEditor';
import { useEffect, useState } from 'react';
const LessonManager = ({ moduleId }) => {
    const [lessons, setLessons] = useState([]);
    const [selectedLessonId, setSelectedLessonId] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const response = await fetch(`/api/modules/${moduleId}/lessons`);
                const data = await response.json();
                if (data.success) {
                    setLessons(data.data);
                }
            } catch (error) {
                console.error("Error fetching lessons:", error);
            }
        };

        fetchLessons();
    }, [moduleId, refreshKey]);

    const handleLessonUpdated = () => {
        setRefreshKey(prev => prev + 1);
        setSelectedLessonId(null); // Reset selection after update
    };

    return (
        <div className={styles.lessonManager}>
            <div className={styles.lessonListContainer}>
                <LessonList
                    lessons={lessons}
                    onSelect={setSelectedLessonId}
                    selectedId={selectedLessonId}
                    onAddNew={() => setSelectedLessonId('new')}
                />
            </div>
            <div className={styles.lessonEditorContainer}>
                {selectedLessonId && (
                    <LessonEditor
                        key={selectedLessonId} // Important for resetting form
                        lessonId={selectedLessonId === 'new' ? null : selectedLessonId}
                        moduleId={moduleId}
                        onSave={handleLessonUpdated}
                        onCancel={() => setSelectedLessonId(null)}
                    />
                )}
            </div>
        </div>
    );
};

export default LessonManager;