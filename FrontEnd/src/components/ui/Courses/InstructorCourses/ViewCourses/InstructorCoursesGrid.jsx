import React, { useEffect, useState } from 'react';
import InstructorCourseCard from './InstructorCourseCard';
import styles from './InstructorCoursesGrid.module.css';

const InstructorCoursesGrid = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/instructor/my-courses');
                const data = await res.json();
                if (data.success) setCourses(data.data);
                else setError('Failed to load courses');
            } catch {
                setError('Network error');
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    const handleDelete = (deletedId) => {
        setCourses((prev) => prev.filter((c) => c.id !== deletedId));
    };

    if (loading) return <p className={styles.loading}>Loading courses...</p>;
    if (error) return <p className={styles.error}>{error}</p>;

    return (
        <section className={styles.gridContainer}>
            <h2 className={styles.header}>
                <span className={styles.gradientText}>🎓 My Courses</span>
            </h2>
            {courses.length === 0 ? (
                <div className={styles.emptyState}>
                    <img
                        className={styles.emptyImg}
                        src="/empty-courses.svg"
                        alt="No courses"
                    />
                    <p>No courses yet. Start by creating one!</p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {courses.map((course) => (
                        <InstructorCourseCard
                            key={course.id}
                            course={course}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};

export default InstructorCoursesGrid;