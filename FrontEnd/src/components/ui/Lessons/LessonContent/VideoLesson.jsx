// components/LessonContent/VideoLesson.jsx
import React from 'react';
import styles from './LessonContent.module.css';

const VideoLesson = ({ src }) => (
    <video controls src={src} className={styles.videoPlayer} />
);

export default VideoLesson;
