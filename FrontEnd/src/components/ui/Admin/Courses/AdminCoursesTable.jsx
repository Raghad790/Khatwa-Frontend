import React, { useEffect, useState } from "react";
import styles from "./AdminCoursesTable.module.css";
import { CheckCircle, XCircle } from "lucide-react";

const AdminCoursesTable = () => {
    const [courses, setCourses] = useState([]);
    const [_loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/course")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data.data)) {
                    setCourses(data.data);
                } else {
                    setCourses([]);
                }
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.headerSection}>
                <span className={styles.badge}>Khatwa Admin</span>
                <h2 className={styles.title}>All Courses</h2>
                <p className={styles.subtitle}>
                    Browse, search and manage all courses on Khatwa.
                </p>
            </div>
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Instructor</th>
                            <th>Category</th>
                            <th>Published</th>
                            <th>Approved</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.map((course, index) => (
                            <tr key={course.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <div className={styles.courseTitle}>
                                        <span className={styles.courseIcon}></span>
                                        {course.title}
                                    </div>
                                </td>
                                <td className={styles.descriptionCell}>
                                    <span title={course.description}>
                                        {course.description?.length > 60
                                            ? course.description.slice(0, 57) + "..."
                                            : course.description}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.instructorName}>
                                        {course.instructor_name || "Unknown"}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.category}>
                                        {course.category_name || "Uncategorized"}
                                    </span>
                                </td>
                                <td>
                                    {course.is_published ? (
                                        <CheckCircle size={18} className={styles.checkIcon} />
                                    ) : (
                                        <XCircle size={18} className={styles.crossIcon} />
                                    )}
                                </td>
                                <td>
                                    {course.is_approved ? (
                                        <CheckCircle size={18} className={styles.checkIcon} />
                                    ) : (
                                        <XCircle size={18} className={styles.crossIcon} />
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminCoursesTable;