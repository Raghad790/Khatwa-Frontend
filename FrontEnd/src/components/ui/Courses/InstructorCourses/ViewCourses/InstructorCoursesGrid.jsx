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

    // This handler removes the deleted course from state without refreshing the page
    const handleDelete = (deletedId) => {
        setCourses((prev) => prev.filter((c) => c.id !== deletedId));
        // Removed window.location.reload()
    };

    if (loading) return <p>Loading courses...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className={styles.gridContainer}>
            <h2 className={styles.header}>My Courses</h2>
            {courses.length === 0 ? (
                <p>No courses yet. Start by creating one!</p>
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
        </div>
    );
};

export default InstructorCoursesGrid;
