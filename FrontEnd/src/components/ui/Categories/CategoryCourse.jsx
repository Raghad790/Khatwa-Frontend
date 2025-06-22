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


    if (loading) return <div>Loading courses...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!courses.length) return <div>No courses in this category.</div>;

    return (
        <section className={style.categoryCourses}>
            <h2>Courses in {categoryName}y</h2>
            <div className={style.grid}>
                {courses.map(course => (
                    <div className={style.card} key={course.id}>
                        <img src={card} alt={course.title} />
                        <h3>{course.title}</h3>
                        <p>{course.description?.substring(0, 100)}...</p>
                        <ViewCourseButton courseId={course.id} />
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CategoryCourses;
