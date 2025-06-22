import React from 'react';
import styles from './InstructorCourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../../../../assets/images/card1.jpg";

const InstructorCourseCard = ({ course, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/course/${course.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();
            console.log('Delete response:', data);

            if (!data.success) throw new Error(data.message || 'Delete failed');

            // Notify parent about deletion
            if (onDelete) onDelete(course.id);

        } catch (err) {
            console.error('Delete error:', err.message);
        }
    };

    return (
        <div className={styles.card}>
            <img
                src={course.thumbnail_url || logo}
                alt={course.title}
                className={styles.image}
            />
            <div className={styles.body}>
                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.description}>
                    {course.description?.slice(0, 100)}...
                </p>
                <div className={styles.meta}>
                    <span className={styles.tag}>{course.category}</span>
                </div>
                <div className={styles.actions}>
                    <button onClick={() => navigate(`/courses/${course.id}`)}>Preview</button>
                    <button onClick={() => navigate(`/edit-course/${course.id}`)}>Edit</button>
                    <button onClick={handleDelete}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCourseCard;
