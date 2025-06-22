import React, { useEffect, useState } from 'react';
import styles from "./QuizLessons.module.css";

const QuizLesson = ({ lessonId }) => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [answers, setAnswers] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [score, setScore] = useState(null);
    const [correctAnswers, setCorrectAnswers] = useState({});

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const res = await fetch(`/api/lessons/${lessonId}/quizzes`, {
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                });
                const data = await res.json();
                if (data.success) {
                    // Expect quizzes WITHOUT correct_answer here
                    setQuizzes(data.data);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                console.error('Error fetching quizzes:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchQuizzes();
    }, [lessonId]);

    const handleAnswerChange = (quizId, selectedOption) => {
        setAnswers(prev => ({
            ...prev,
            [quizId]: selectedOption
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`/api/lessons/${lessonId}/quizzes/submit`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ answers }),
            });
            const data = await response.json();
            if (data.success) {
                setScore(data.score);
                setCorrectAnswers(data.correctAnswers); // Correct answers from backend after submission
                setSubmitted(true);
            } else {
                alert('Submission failed.');
            }
        } catch (err) {
            console.error(err);
            alert('Error submitting quiz.');
        }
    };

    if (loading) return <p className={styles.loading}>Loading quiz...</p>;
    if (!quizzes.length) return <p className={styles.loading}>No quizzes available.</p>;

    return (
        <div className={styles.quizContainer}>
            <h2 className={styles.quizTitle}>Test Your Knowledge</h2>

            {quizzes.map((quiz, index) => (
                <div
                    key={quiz.id}
                    className={`${styles.quizCard} ${submitted
                        ? (answers[quiz.id] === correctAnswers[quiz.id] ? styles.correct : styles.incorrect)
                        : ''
                        }`}
                >
                    <h3 className={styles.quizQuestion}>
                        {index + 1}. {quiz.question}
                    </h3>
                    <ul className={styles.quizOptions}>
                        {Object.entries(quiz.options).map(([key, value]) => (
                            <li key={key} className={styles.optionItem}>
                                <label className={styles.quizOption}>
                                    <input
                                        type="radio"
                                        name={`quiz-${quiz.id}`}
                                        value={key}
                                        disabled={submitted}
                                        checked={answers[quiz.id] === key}
                                        onChange={() => handleAnswerChange(quiz.id, key)}
                                        className={styles.radioInput}
                                    />
                                    <span>{value}</span>
                                    {submitted && correctAnswers[quiz.id] === key && (
                                        <span className={styles.correctTag}>Correct</span>
                                    )}
                                    {submitted && answers[quiz.id] === key && answers[quiz.id] !== correctAnswers[quiz.id] && (
                                        <span className={styles.incorrectTag}>Your Answer</span>
                                    )}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}

            {!submitted ? (
                <button
                    className={styles.submitButton}
                    onClick={handleSubmit}
                    disabled={Object.keys(answers).length !== quizzes.length}
                    aria-disabled={Object.keys(answers).length !== quizzes.length}
                >
                    Submit Answers
                </button>
            ) : (
                <div className={styles.resultBox}>
                    <h3>Your Score: <span className={styles.scoreValue}>{score ?? '-'}</span> / {quizzes.length * 10}</h3>
                    <button
                        className={styles.retryButton}
                        onClick={() => {
                            setAnswers({});
                            setSubmitted(false);
                            setScore(null);
                            setCorrectAnswers({});
                        }}
                    >
                        Retake Quiz
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuizLesson;
