// components/Lessons/NextLessonButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './LessonNavButton.module.css';

const NextLessonButton = ({ nextLessonId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (nextLessonId) {
            navigate(`/lessons/${nextLessonId}`);
        }
    };

    return (
        <button className={styles.button} onClick={handleClick} disabled={!nextLessonId}>
            Next Lesson →
        </button>
    );
};

NextLessonButton.propTypes = {
    nextLessonId: PropTypes.number,
};

export default NextLessonButton;
