import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import style from "./CategoryCourses.module.css";
import card from "../../../assets/images/card1.jpg";
import ViewCourseButton from "../Courses/StudentCourse/ViewCourseBtn";

function CategoryCourses() {
    const { id } = useParams();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch courses
                const courseRes = await fetch(`/api/categories/${id}/courses`);
                const courseData = await courseRes.json();
                if (!courseRes.ok) throw new Error(courseData.message || "Failed to fetch courses");
                setCourses(courseData.data || []);

                // Fetch category name
                const catRes = await fetch(`/api/categories/${id}`);
                const catData = await catRes.json();
                if (!catRes.ok) throw new Error(catData.message || "Failed to fetch category");
                setCategoryName(catData.data?.name || "Unknown");

                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        }
        fetchData();
    }, [id]);

    if (loading) return <div className={style.loading}>Loading courses...</div>;
    if (error) return <div className={style.error}>Error: {error}</div>;
    if (!courses.length) return (
        <section className={style.categoryCourses}>
            <div className={style.emptyState}>
                <img src="/empty-courses.svg" alt="No courses" className={style.emptyImg} />
                <h3>No courses in this category yet.</h3>
            </div>
        </section>
    );

    return (
        <section className={style.categoryCourses}>
            <h2>
                <span className={style.gradientText}>
                    <span className={style.icon}>📚</span> {categoryName} Courses
                </span>
            </h2>
            <div className={style.grid}>
                {courses.map(course => (
                    <div className={style.card} key={course.id}>
                        <div className={style.thumbnailWrapper}>
                            <img
                                src={course.thumbnail_url || card}
                                alt={course.title}
                                className={style.cardImg}
                                onError={e => { e.target.src = card; }}
                            />
                            <span className={style.categoryTag}>
                                {course.category_name || categoryName}
                            </span>
                        </div>
                        <div className={style.cardBody}>
                            <h3>{course.title}</h3>
                            <p>
                                {course.description
                                    ? (course.description.length > 110
                                        ? course.description.substring(0, 110) + "..."
                                        : course.description)
                                    : "No description available."}
                            </p>
                        </div>
                        <ViewCourseButton courseId={course.id} className={style.viewBtn} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryCourses;