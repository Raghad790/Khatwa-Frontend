// components/Lessons/PreviousLessonButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './LessonNavButton.module.css';

const PreviousLessonButton = ({ prevLessonId }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (prevLessonId) {
            navigate(`/lessons/${prevLessonId}`);
        }
    };

    return (
        <button className={styles.button} onClick={handleClick} disabled={!prevLessonId}>
            ← Previous Lesson
        </button>
    );
};

PreviousLessonButton.propTypes = {
    prevLessonId: PropTypes.number,
};

export default PreviousLessonButton;
