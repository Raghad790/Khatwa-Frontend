import React, { useState } from 'react';
import styles from './ModuleItem.module.css';
import LessonItem from '../Lessons/LessonItem';

const ModuleItem = ({ module }) => {
    const [lessons, setLessons] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [selectedLessonId, setSelectedLessonId] = useState(null);

    const toggleModule = async () => {
        if (!expanded) {
            try {
                const response = await fetch(`/api/modules/${module.id}/lessons`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });

                const data = await response.json();
                if (data && data.success && Array.isArray(data.data)) {
                    // Initialize lessons with a completed flag set to false
                    const lessonsWithCompletion = data.data.map(lesson => ({
                        ...lesson,
                        completed: false,
                    }));
                    setLessons(lessonsWithCompletion);
                } else {
                    throw new Error("Invalid lessons response format");
                }
            } catch (error) {
                console.error("Failed to fetch lessons:", error);
            }
        }
        setExpanded(!expanded);
    };

    const handleSelectLesson = (lessonId) => {
        setSelectedLessonId(lessonId);
    };

    const handleToggleComplete = (lessonId) => {
        setLessons((prevLessons) =>
            prevLessons.map((lesson) =>
                lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
            )
        );
    };

    return (
        <div className={styles.moduleBox}>
            <div className={styles.moduleHeader} onClick={toggleModule}>
                <span>{module.title}</span>
                <span className={styles.toggle}>{expanded ? '−' : '+'}</span>
            </div>
            {expanded && Array.isArray(lessons) && (
                <ul className={styles.lessonsList}>
                    {lessons.map((lesson) => (
                        <LessonItem
                            key={lesson.id}
                            lesson={lesson}
                            isSelected={lesson.id === selectedLessonId}
                            onSelectLesson={handleSelectLesson}
                            onToggleComplete={handleToggleComplete}
                        />
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ModuleItem;
