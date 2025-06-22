import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './LessonPage.module.css';
import NextLessonButton from '../../../components/ui/Lessons/LessonNavigation/NextLessonButton';
import PreviousLessonButton from '../../../components/ui/Lessons/LessonNavigation/PrevLessonButton';
import LessonContent from './LessonContent/LessonsContents';
import BackToCoursesButton from '../../../components/ui/Lessons/BacktoCourse';

const LessonPage = () => {
    const { lessonId } = useParams();
    const [lesson, setLesson] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        const fetchLesson = async () => {
            try {
                const res = await fetch(`/api/lessons/${lessonId}`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                if (data.success) {
                    setLesson(data.data);
                    setCompleted(data.data.completed);
                } else {
                    throw new Error(data.message || 'Failed to fetch lesson');
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchLesson();
    }, [lessonId]);

    const handleMarkComplete = async () => {
        try {
            const res = await fetch(`/api/lessons/${lessonId}/complete`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            });
            const data = await res.json();
            if (data.success) {
                setCompleted(true);
                alert('Lesson marked as completed');
            } else {
                alert('Failed to mark as completed');
            }
        } catch (err) {
            console.error(err);
            alert('Error occurred while marking complete');
        }
    };

    if (loading) return <div>Loading lesson...</div>;
    if (!lesson) return <div>Lesson not found</div>;

    return (
        <div className={styles.lessonPage}>
            <div className={styles.container}>
                <BackToCoursesButton />
            </div>
            <h1>{lesson.title}</h1>

            <div className={styles.content}>
                <LessonContent lesson={lesson} />
            </div>

            <div className={styles.navigationButtons}>
                {lesson.prevLessonId && <PreviousLessonButton lessonId={lesson.prevLessonId} />}
                <button
                    disabled={completed}
                    className={completed ? styles.completedButton : styles.completeButton}
                    onClick={handleMarkComplete}
                >
                    {completed ? 'Completed' : 'Mark as Completed'}
                </button>
                {lesson.nextLessonId && <NextLessonButton lessonId={lesson.nextLessonId} />}
            </div>
        </div>
    );
};

export default LessonPage;
