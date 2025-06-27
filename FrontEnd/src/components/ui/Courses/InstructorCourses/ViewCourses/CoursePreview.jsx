import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import styles from './CoursePreview.module.css';
import defaultThumbnail from '../../../../../assets/images/card1.jpg';

const CoursePreview = () => {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('overview');
    const [modules, setModules] = useState([]);
    const [enrollments, setEnrollments] = useState([]);
    const [assignments, setAssignments] = useState([]);
    const [quizzes, setQuizzes] = useState([]);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                setLoading(true);

                // Fetch course details
                const courseRes = await fetch(`/api/course/${courseId}`);
                if (!courseRes.ok) throw new Error(`HTTP ${courseRes.status}`);
                const courseData = await courseRes.json();
                setCourse(courseData.data);

                // Fetch modules
                const modulesRes = await fetch(`/api/courses/${courseId}/modules`);
                if (!modulesRes.ok) throw new Error(`HTTP ${modulesRes.status}`);
                const modulesData = await modulesRes.json();
                const modulesArray = Array.isArray(modulesData.data) ? modulesData.data : [];
                setModules(modulesArray);

                // Fetch assignments & quizzes for each lesson in modules
                if (modulesArray.length > 0) {
                    const allAssignments = [];
                    const allQuizzes = [];
                    for (const module of modulesArray) {
                        const lessonsRes = await fetch(`/api/modules/${module.id}/lessons`);
                        const lessonsData = lessonsRes.ok ? await lessonsRes.json() : { data: [] };
                        const lessonsArray = lessonsData.success && Array.isArray(lessonsData.data) ? lessonsData.data : [];
                        for (const lesson of lessonsArray) {
                            // Assignments
                            const assignmentsRes = await fetch(`/api/lessons/${lesson.id}/assignments`);
                            if (assignmentsRes.ok) {
                                const assignmentsData = await assignmentsRes.json();
                                if (assignmentsData.success && Array.isArray(assignmentsData.data)) {
                                    allAssignments.push(...assignmentsData.data);
                                }
                            }
                            // Quizzes
                            const quizzesRes = await fetch(`/api/lessons/${lesson.id}/quizzes`);
                            if (quizzesRes.ok) {
                                const quizzesData = await quizzesRes.json();
                                if (quizzesData.success && Array.isArray(quizzesData.data)) {
                                    allQuizzes.push(...quizzesData.data);
                                }
                            }
                        }
                    }
                    setAssignments(allAssignments);
                    setQuizzes(allQuizzes);
                }

                // Fetch enrollments
                const enrollmentsRes = await fetch(`/api/courses/${courseId}/enrollments`);
                const enrollmentsData = enrollmentsRes.ok ? await enrollmentsRes.json() : { data: [] };
                setEnrollments(enrollmentsData || []);
            } catch (err) {
                setError(err.message);
                setModules([]);
                setAssignments([]);
                setQuizzes([]);
                setEnrollments([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

    if (loading) return <p className={styles.message}>Loading course details...</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!course) return <p className={styles.message}>Course not found.</p>;

    const enrollmentCount = enrollments.length;

    return (
        <div className={styles.container}>
            <button onClick={() => navigate(-1)} className={styles.backBtn}>← Back to Courses</button>
            <div className={styles.header}>
                <img
                    src={course.thumbnail_url || defaultThumbnail}
                    alt={course.title}
                    className={styles.thumbnail}
                />
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>{course.title}</h1>
                    <p className={styles.instructor}>Instructor: {course.instructor_name}</p>
                    <p className={styles.meta}>
                        <span>Category: {course.category_name}</span>
                        <span>Students: {enrollmentCount}</span>
                    </p>
                </div>
            </div>
            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === 'overview' ? styles.active : ''}`}
                    onClick={() => setActiveTab('overview')}
                >
                    Overview
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'modules' ? styles.active : ''}`}
                    onClick={() => setActiveTab('modules')}
                >
                    Modules
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'students' ? styles.active : ''}`}
                    onClick={() => setActiveTab('students')}
                >
                    Students ({enrollmentCount})
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'assignments' ? styles.active : ''}`}
                    onClick={() => setActiveTab('assignments')}
                >
                    Assignments
                </button>
                <button
                    className={`${styles.tab} ${activeTab === 'quizzes' ? styles.active : ''}`}
                    onClick={() => setActiveTab('quizzes')}
                >
                    Quizzes
                </button>
            </div>
            <div className={styles.tabContent}>
                {activeTab === 'overview' && (
                    <div className={styles.overview}>
                        <h2>Course Description</h2>
                        <p>{course.description}</p>
                        <h2>Course Details</h2>
                        <div className={styles.detailsGrid}>
                            <div>
                                <h3>Status</h3>
                                <p>{course.is_published ? 'Published' : 'Draft'}</p>
                            </div>
                            <div>
                                <h3>Created</h3>
                                <p>{new Date(course.created_at).toLocaleDateString()}</p>
                            </div>
                            <div>
                                <h3>Last Updated</h3>
                                <p>{new Date(course.updated_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                )}
                {activeTab === 'modules' && (
                    <div className={styles.modules}>
                        <h2>Course Modules</h2>
                        {modules.length > 0 ? (
                            <div className={styles.moduleList}>
                                {modules.map(module => (
                                    <div key={module.id} className={styles.moduleCard}>
                                        <h3>{module.title}</h3>
                                        <p>{module.description}</p>
                                        <div className={styles.moduleMeta}>
                                            <span>Order: {module.order}</span>
                                            <span>Lessons: {module.lessons?.length || 0}</span>
                                        </div>
                                        <Link
                                            to={`/instructor/courses/${courseId}/modules/${module.id}`}
                                            className={styles.viewBtn}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No modules available yet.</p>
                        )}
                    </div>
                )}
                {activeTab === 'students' && (
                    <div className={styles.students}>
                        <h2>Enrolled Students</h2>
                        {enrollments.length > 0 ? (
                            <div className={styles.studentList}>
                                {enrollments.map(enrollment => (
                                    <div key={enrollment.id} className={styles.studentCard}>
                                        <div className={styles.studentInfo}>
                                            <span className={styles.avatar}>
                                                {enrollment.student_name?.charAt(0) || 'U'}
                                            </span>
                                            <div>
                                                <h3>{enrollment.student_name || 'Unknown'}</h3>
                                                <p>{enrollment.student_email || 'No email'}</p>
                                                <p>Joined: {new Date(enrollment.enrolled_at).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className={styles.progress}>
                                            <span>Progress: {enrollment.progress || 0}%</span>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{ width: `${enrollment.progress || 0}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No students enrolled yet.</p>
                        )}
                    </div>
                )}
                {activeTab === 'assignments' && (
                    <div className={styles.assignments}>
                        <h2>Course Assignments</h2>
                        {assignments.length > 0 ? (
                            <div className={styles.assignmentList}>
                                {assignments.map(assignment => (
                                    <div key={assignment.id} className={styles.assignmentCard}>
                                        <div className={styles.assignmentHeader}>
                                            <h3>{assignment.title}</h3>
                                            <span className={styles.dueDate}>
                                                Due: {assignment.deadline ? new Date(assignment.deadline).toLocaleDateString() : 'No deadline'}
                                            </span>
                                        </div>
                                        <p>{assignment.description}</p>
                                        <button
                                            onClick={() => navigate(`/instructor/courses/${courseId}/assignments/${assignment.id}/submissions`)}
                                            className={styles.gradeBtn}
                                        >
                                            Grade Submissions
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No assignments created yet.</p>
                        )}
                    </div>
                )}
                {activeTab === 'quizzes' && (
                    <div className={styles.quizzes}>
                        <h2>Course Quizzes</h2>
                        {quizzes.length > 0 ? (
                            <div className={styles.quizList}>
                                {quizzes.map(quiz => (
                                    <div key={quiz.id} className={styles.quizCard}>
                                        <h3>{quiz.question}</h3>
                                        <div className={styles.quizMeta}>
                                            <span>Options: {Object.keys(quiz.options).length}</span>
                                            <span>Correct Answer: {quiz.correct_answer}</span>
                                            <span>Max Score: {quiz.max_score}</span>
                                        </div>
                                        <Link
                                            to={`/instructor/courses/${courseId}/quizzes/${quiz.id}/results`}
                                            className={styles.resultsBtn}
                                        >
                                            View Results
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No quizzes created yet.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoursePreview;