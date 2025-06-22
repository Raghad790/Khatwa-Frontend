// components/LessonContent/AssignmentLesson.jsx
import React from 'react';
import styles from './LessonContent.module.css';

const AssignmentLesson = ({ src }) => (
    <iframe src={src} title="Assignment" className={styles.iframeContent} />
);

export default AssignmentLesson;
