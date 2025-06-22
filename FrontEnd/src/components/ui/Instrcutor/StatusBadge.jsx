// components/StatusBadge.jsx
import React from 'react';
import styles from './StatusBadge.module.css';

const StatusBadge = ({ graded, late }) => {
    let status = 'ungraded';
    let label = 'Ungraded';

    if (graded) {
        status = 'graded';
        label = 'Graded';
    } else if (late) {
        status = 'late';
        label = 'Late';
    }

    return (
        <span className={`${styles.statusBadge} ${styles[status]}`}>
            {label}
        </span>
    );
};

export default StatusBadge;