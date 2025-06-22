import React, { useState, useEffect } from 'react';
import styles from './EditLessons.module.css';

const QuizEditor = ({ lessonId }) => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!lessonId) return;

        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/lessons/${lessonId}/quizzes`);
                const data = await response.json();
                if (data.success) {
                    setQuestions(data.data);
                }
            } catch (error) {
                console.error("Error fetching quiz questions:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [lessonId]);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][field] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (questionIndex, optionIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[questionIndex].options[optionIndex] = value;
        setQuestions(updatedQuestions);
    };

    const addQuestion = () => {
        setQuestions([...questions, {
            question: '',
            options: ['', '', '', ''],
            correct_answer: '',
            max_score: 10
        }]);
    };

    const removeQuestion = (index) => {
        setQuestions(questions.filter((_, i) => i !== index));
    };

    const saveQuestions = async () => {
        setLoading(true);
        try {
            // Implement your save logic here
            // This would involve API calls to save each question
            console.log("Questions to save:", questions);
            // Add your API call logic here
        } catch (error) {
            console.error("Error saving questions:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.quizEditor}>
            <h4>Quiz Questions</h4>

            {questions.map((q, qIndex) => (
                <div key={qIndex} className={styles.questionCard}>
                    <div className={styles.questionHeader}>
                        <h5>Question {qIndex + 1}</h5>
                        <button
                            type="button"
                            onClick={() => removeQuestion(qIndex)}
                            className={styles.deleteButton}
                        >
                            Delete
                        </button>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Question Text</label>
                        <input
                            type="text"
                            value={q.question}
                            onChange={(e) => handleQuestionChange(qIndex, 'question', e.target.value)}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Options</label>
                        {q.options.map((option, oIndex) => (
                            <div key={oIndex} className={styles.optionRow}>
                                <input
                                    type="radio"
                                    name={`correct-${qIndex}`}
                                    checked={q.correct_answer === option}
                                    onChange={() => handleQuestionChange(qIndex, 'correct_answer', option)}
                                />
                                <input
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                                    placeholder={`Option ${oIndex + 1}`}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Max Score</label>
                        <input
                            type="number"
                            value={q.max_score}
                            onChange={(e) => handleQuestionChange(qIndex, 'max_score', e.target.value)}
                            min="1"
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={addQuestion}
                className={styles.addButton}
            >
                Add Question
            </button>

            <button
                type="button"
                onClick={saveQuestions}
                disabled={loading}
                className={styles.saveButton}
            >
                {loading ? 'Saving...' : 'Save Questions'}
            </button>
        </div>
    );
};

export default QuizEditor;