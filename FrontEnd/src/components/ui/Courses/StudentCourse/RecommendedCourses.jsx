import React, { useEffect, useState } from 'react';
import style from './Recommended.module.css';
import card from "../../../../assets/images/card1.jpg";
import { useNavigate } from "react-router-dom";

function Recommended() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const res = await fetch('/api/course/recommended', { credentials: 'include' });
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data?.message || "Failed to fetch");
                }
                setCourses(data.courses || []);
            } catch (err) {
                console.error("Failed to fetch recommended courses", err);
            } finally {
                setLoading(false);
            }
        };
        fetchCourses();
    }, []);

    if (loading) return <p className={style.loading}>Loading recommended courses...</p>;

    return (
        <div className={style.recommendedContainer}>
            <h2 className={style.recommendedTitle}>🎯 Recommended For You</h2>
            <div className={style.recommendedGrid}>
                {courses.map(course => (
                    <div key={course.id} className={style.courseCard}>
                        <div className={style.cardImageWrapper} onClick={() => navigate(`/course/${course.id}`)} tabIndex={0} role="button" aria-label={`View course ${course.title}`}>
                            <img
                                src={course.thumbnail_url || card}
                                alt={course.title}
                                className={style.cardImage}
                                onError={e => { e.target.src = card; }}
                            />
                        </div>
                        <h3>{course.title}</h3>
                        <p>{course.description ? (course.description.length > 80 ? course.description.slice(0, 80) + "..." : course.description) : "No description available"}</p>
                        <button className={style.btnView} onClick={() => navigate(`/course/${course.id}`)}>
                            View Course
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Recommended;