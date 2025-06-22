import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LessonItem.module.css';

const LessonItem = ({ lesson }) => {
    const navigate = useNavigate();

    const goToLesson = () => {
        navigate(`/lessons/${lesson.id}`);
    };

    return (
        <li className={styles.lessonItem}>
            <span className={styles.lessonTitle} onClick={goToLesson}>
                {lesson.title}
            </span>
        </li>
    );
};

export default LessonItem;
