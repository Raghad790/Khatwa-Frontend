import React from 'react';
import styles from './InstructorCourseCard.module.css';
import { useNavigate } from 'react-router-dom';
import logo from "../../../../../assets/images/khdatabasemang.jpg";

const InstructorCourseCard = ({ course, onDelete }) => {
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await fetch(`/api/course/${course.id}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (!data.success) throw new Error(data.message || 'Delete failed');
            if (onDelete) onDelete(course.id);
        } catch (err) {
            console.error('Delete error:', err.message);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.thumbnailWrapper}>
                <img
                    src={course.thumbnail_url || logo}
                    alt={course.title}
                    className={styles.image}
                    onError={e => { e.target.src = logo; }}
                />
                <span className={styles.categoryTag}>
                    {course.category || "Uncategorized"}
                </span>
            </div>
            <div className={styles.body}>
                <h3 className={styles.title}>{course.title}</h3>
                <p className={styles.description}>
                    {course.description?.slice(0, 100) || "No description."}{course.description?.length > 100 ? '...' : ''}
                </p>
                <div className={styles.meta}>
                    <span className={styles.students}>
                        <span className={styles.icon}>👥</span>
                        {course?.students_count ?? 0} students
                    </span>
                    <span className={styles.status + ' ' + (course.is_published ? styles.published : styles.draft)}>
                        {course.is_published ? "Published" : "Draft"}
                    </span>
                </div>
                <div className={styles.actions}>
                    <button
                        className={styles.previewBtn}
                        onClick={() => navigate(`/courses/${course.id}`)}
                    >
                        Preview
                    </button>
                    <button
                        className={styles.editBtn}
                        onClick={() => navigate(`/edit-course/${course.id}`)}
                    >
                        Edit
                    </button>
                    <button
                        className={styles.deleteBtn}
                        onClick={handleDelete}
                        title="Delete Course"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstructorCourseCard;