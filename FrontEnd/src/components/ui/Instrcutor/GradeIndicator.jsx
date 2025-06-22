// components/GradeIndicator.jsx
import React from 'react';
import styles from './GradeIndicator.module.css';

const GradeIndicator = ({ grade }) => {
    let letterGrade = 'F';
    if (grade >= 90) letterGrade = 'A';
    else if (grade >= 80) letterGrade = 'B';
    else if (grade >= 70) letterGrade = 'C';
    else if (grade >= 60) letterGrade = 'D';

    return (
        <span className={`${styles.gradeIndicator} ${styles[letterGrade]}`}>
            {letterGrade}
        </span>
    );
};

export default GradeIndicator;