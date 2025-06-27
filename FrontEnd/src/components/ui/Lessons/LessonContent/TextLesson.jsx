// components/LessonContent/TextLesson.jsx

import styles from './LessonContent.module.css';

const TextLesson = ({ content }) => (
    <p className={styles.textContent}>{content || 'No content available.'}</p>
);

export default TextLesson;
