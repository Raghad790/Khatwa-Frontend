import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../../layout/StudentLayout/footer";
import Header from "../../../layout/StudentLayout/header";
import style from "./CourseDetails.module.css";
import fallbackImage from "../../../../assets/images/khacademic.jpg";
import EnrollButton from "../../enrollments/EnrollButton";
import ModuleList from "../../modules/ModuleList";

function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedModule, setExpandedModule] = useState(null);

  useEffect(() => {
    fetch(`/api/course/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Course not found");
        return res.json();
      })
      .then((data) => {
        setCourse(data.data);
        return fetch(`/api/courses/${id}/modules`);
      })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load modules");
        return res.json();
      })
      .then((data) => {
        setModules(data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleModuleClick = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  return (
    <>
      <Header />
      <div className={style.container}>
        {loading && <p className={style.status}>Loading...</p>}
        {error && <p className={style.status}>Error: {error}</p>}

        {course && (
          <>
            {/* Edudeme/Khatwa-Inspired Course Header */}
            <section className={style.courseHeader}>
              <div className={style.thumbnailWrapper}>
                <img
                  src={course.thumbnail_url || fallbackImage}
                  alt={course.title}
                  className={style.thumbnail}
                  onError={(e) => (e.target.src = fallbackImage)}
                />
              </div>
              <div className={style.courseInfo}>
                <span className={style.badge}>Khatwa Course</span>
                <h1 className={style.courseTitle}>{course.title}</h1>
                <p className={style.courseDescription}>{course.description}</p>
                <div className={style.metaGrid}>
                  <div className={style.metaItem}>
                    <span className={style.metaLabel}>Instructor</span>
                    <span className={style.metaValue}>{course.instructor_name || "Unknown"}</span>
                  </div>
                  <div className={style.metaItem}>
                    <span className={style.metaLabel}>Category</span>
                    <span className={style.metaValue}>{course.category_name || "Uncategorized"}</span>
                  </div>
                  <div className={style.metaItem}>
                    <span className={style.metaLabel}>Level</span>
                    <span className={style.metaValue}>{course.level || "All levels"}</span>
                  </div>
                </div>
                <EnrollButton
                  courseId={course.id}
                  className={style.enrollButton}
                />
              </div>
            </section>

            {/* Edudeme/Khatwa-Inspired Course Content */}
            <section className={style.courseContent}>
              <header className={style.contentHeader}>
                <h2 className={style.contentTitle}>Course Content</h2>
                <span className={style.moduleCount}>
                  {modules.length} Modules &bull;{" "}
                  {modules.reduce(
                    (acc, m) => acc + (m.lessons?.length || 0),
                    0
                  )}{" "}
                  Lessons
                </span>
              </header>

              <ModuleList
                modules={modules.map((module) => ({
                  ...module,
                  progress: calculateModuleProgress(module),
                }))}
                onModuleClick={handleModuleClick}
                expandedModule={expandedModule}
              />

              {expandedModule && (
                <div className={style.lessonsContainer}>
                  <h3 className={style.lessonsTitle}>
                    {modules.find((m) => m.id === expandedModule)?.title}
                  </h3>
                  <ul className={style.lessonsList}>
                    {modules
                      .find((m) => m.id === expandedModule)
                      ?.lessons?.map((lesson) => (
                        <li key={lesson.id} className={style.lessonItem}>
                          <div className={style.lessonInfo}>
                            <PlayIcon />
                            <span className={style.lessonTitle}>
                              {lesson.title}
                            </span>
                          </div>
                          <span className={style.lessonDuration}>
                            {lesson.duration || "--:--"}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </section>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

const PlayIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={style.playIcon}
  >
    <path d="M8 5V19L19 12L8 5Z" fill="#7f56da" />
  </svg>
);

const calculateModuleProgress = (module) => {
  if (!module.lessons || module.lessons.length === 0) return 0;
  const completedLessons = module.lessons.filter(
    (lesson) => lesson.completed
  ).length;
  return Math.round((completedLessons / module.lessons.length) * 100);
};

export default CourseDetails;