import { useCourses } from '../../../../hooks/course/useCourses';
import style from "./ViewCourses.module.css";
import card from "../../../../assets/images/khacademic.jpg";
import ErrorBoundary from '../../errors/ErrorBoundary';
import { useNavigate } from 'react-router-dom';
import ViewCourseButton from './ViewCourseBtn';

function CourseCards() {
    const { courses, loading, error } = useCourses();
    const navigate = useNavigate();

    if (loading) return <div className={style.loading}>Loading courses...</div>;
    if (error) return <div className={style.error}>Error: {error}</div>;
    if (!courses?.length) return <div className={style.empty}>No courses found</div>;

    return (
        <ErrorBoundary>
            <div className={style.cardsContainer}>
                {courses.map((course) => (
                    <div className={style.card} key={course.id}>
                        <div
                            className={style.clickable}
                            onClick={() => navigate(`/course/${course.id}`)}
                            tabIndex={0}
                            role="button"
                            aria-label={`View course ${course.title}`}
                            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && navigate(`/course/${course.id}`)}
                        >
                            <div className={style.thumbnailWrapper}>
                                <img
                                    src={course.thumbnail_url || card}
                                    alt={course.title}
                                    className={style.logo}
                                    onError={(e) => {
                                        e.target.src = card;
                                    }}
                                />
                                <span className={style.categoryTag}>
                                    {course.category_name || "Uncategorized"}
                                </span>
                            </div>
                            <div className={style.cardBody}>
                                <h3 className={style.courseTitle}>{course.title}</h3>
                                <div className={style.instructorRow}>
                                    <span className={style.instructorIcon} />
                                    <span>{course.instructor_name || 'Unknown'}</span>
                                </div>
                                <p className={style.description}>
                                    {course.description
                                        ? (course.description.length > 100
                                            ? `${course.description.substring(0, 100)}...`
                                            : course.description)
                                        : 'No description available'}
                                </p>
                            </div>
                        </div>
                        <ViewCourseButton courseId={course.id} className={style.viewBtn} />
                    </div>
                ))}
            </div>
        </ErrorBoundary>
    );
}

export default CourseCards;