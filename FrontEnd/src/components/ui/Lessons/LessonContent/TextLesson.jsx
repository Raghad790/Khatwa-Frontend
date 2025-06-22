// components/LessonContent/TextLesson.jsx
import React from 'react';
import styles from './LessonContent.module.css';

const TextLesson = ({ content }) => (
    <p className={styles.textContent}>{content || 'No content available.'}</p>
);

export default TextLesson;
