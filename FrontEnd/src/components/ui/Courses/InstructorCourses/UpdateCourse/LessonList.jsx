import React from 'react';
import styles from './EditLessons.module.css';

const LessonList = ({ lessons, onSelect, selectedId, onAddNew }) => {
    return (
        <div className={styles.lessonList}>
            <h3>Lessons</h3>
            <button
                className={styles.addButton}
                onClick={onAddNew}
            >
                + Add New Lesson
            </button>
            <ul>
                {lessons.map(lesson => (
                    <li
                        key={lesson.id}
                        className={`${styles.lessonItem} ${selectedId === lesson.id ? styles.selected : ''}`}
                        onClick={() => onSelect(lesson.id)}
                    >
                        <span className={styles.lessonOrder}>{lesson.order}.</span>
                        <span className={styles.lessonTitle}>{lesson.title}</span>
                        <span className={styles.lessonType}>{lesson.content_type}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;