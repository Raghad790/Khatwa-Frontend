import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LessonFormWithContent.module.css';

const QuizQuestionInput = ({ questionIndex, questionData, onChange, onRemove }) => {
    // questionData = { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
    const handleOptionChange = (optIndex, value) => {
        const newOptions = [...questionData.options];
        newOptions[optIndex] = value;
        onChange(questionIndex, { ...questionData, options: newOptions });
    };

    return (
        <div className={styles.quizQuestion}>
            <input
                type="text"
                placeholder={`Question #${questionIndex + 1}`}
                value={questionData.question}
                onChange={(e) => onChange(questionIndex, { ...questionData, question: e.target.value })}
                required
                className={styles.input}
            />
            <div className={styles.optionsGroup}>
                {questionData.options.map((opt, i) => (
                    <div key={i} className={styles.optionItem}>
                        <input
                            type="text"
                            placeholder={`Option ${i + 1}`}
                            value={opt}
                            onChange={(e) => handleOptionChange(i, e.target.value)}
                            required
                            className={styles.input}
                        />
                        <label>
                            <input
                                type="radio"
                                name={`correctAnswer-${questionIndex}`} // ✅ scoped per question
                                checked={questionData.correctAnswerIndex === i}
                                onChange={() => onChange(questionIndex, { ...questionData, correctAnswerIndex: i })}
                            />

                            Correct
                        </label>
                    </div>
                ))}
            </div>
            <button type="button" className={styles.removeButton} onClick={() => onRemove(questionIndex)}>
                Remove Question
            </button>
            <hr />
        </div>
    );
};

const LessonFormWithContent = ({ modules = [], onNext }) => {
    const navigate = useNavigate()

    // Lesson creation states
    const [selectedModuleId, setSelectedModuleId] = useState('');
    const [title, setTitle] = useState('');
    const [duration, setDuration] = useState('');
    const [order, setOrder] = useState('');
    const [contentType, setContentType] = useState('');
    const [contentUrl, setContentUrl] = useState('');
    const [contentText, setContentText] = useState('');
    const [isFree, setIsFree] = useState(false);
    const [lessons, setLessons] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Quiz questions state (for contentType = quiz)
    const [quizQuestions, setQuizQuestions] = useState([
        { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 },
    ]);

    // Assignment state (for contentType = assignment)
    const [assignmentTitle, setAssignmentTitle] = useState('');
    const [assignmentDescription, setAssignmentDescription] = useState('');
    const [assignmentDeadline, setAssignmentDeadline] = useState('');
    const [assignmentMaxScore, setAssignmentMaxScore] = useState(100);

    // Handle quiz question updates
    const updateQuizQuestion = (index, newData) => {
        const newQuestions = [...quizQuestions];
        newQuestions[index] = newData;
        setQuizQuestions(newQuestions);
    };

    // Remove quiz question
    const removeQuizQuestion = (index) => {
        const newQuestions = quizQuestions.filter((_, i) => i !== index);
        setQuizQuestions(newQuestions.length ? newQuestions : [{ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    };

    // Add new quiz question
    const addQuizQuestion = () => {
        setQuizQuestions([...quizQuestions, { question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
    };

    // Submit lesson and related content
    const handleAddLesson = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        if (!selectedModuleId || !title || !duration || !order || !contentType) {
            setError('Please fill all required fields for the lesson.');
            return;
        }

        if (contentType === 'video' && !contentUrl.trim()) {
            setError('Content URL is required for video lessons.');
            return;
        }

        if (contentType === 'text' && !contentText.trim()) {
            setError('Content text is required for text lessons.');
            return;
        }

        if (isNaN(order) || Number(order) < 0) {
            setError('Order must be a non-negative number.');
            return;
        }

        try {
            // Create lesson first
            const lessonPayload = {
                module_id: parseInt(selectedModuleId),
                title,
                duration: Number(duration),
                order: Number(order),
                content_type: contentType,
                is_free: isFree,
            };

            if (contentType === 'video') lessonPayload.content_url = contentUrl.trim();
            else if (contentType === 'text') lessonPayload.content_text = contentText.trim();

            const resLesson = await fetch('/api/lessons', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(lessonPayload),
            });

            const lessonData = await resLesson.json();
            if (!lessonData.success) throw new Error(lessonData.message || 'Failed to add lesson.');

            const newLesson = lessonData.data;
            setLessons((prev) => [...prev, newLesson]);

            // If quiz, submit quiz questions linked to this lesson
            if (contentType === 'quiz') {
                for (const q of quizQuestions) {
                    if (!q.question.trim()) throw new Error('Each question must have a title.');
                    if (q.options.some(opt => !opt.trim())) throw new Error('All quiz options must be filled.');
                    if (q.correctAnswerIndex < 0 || q.correctAnswerIndex > 3) throw new Error('A correct answer must be selected.');

                    const resQuiz = await fetch('/api/quizzes', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            lesson_id: newLesson.id,
                            question: q.question.trim(),
                            options: q.options,
                            correct_answer: q.options[q.correctAnswerIndex].trim(),
                        }),
                    });

                    const quizData = await resQuiz.json();
                    if (!quizData.success) throw new Error(quizData.message || 'Failed to add quiz question.');
                }
            }

            // If assignment, submit assignment linked to lesson
            if (contentType === 'assignment') {
                if (!assignmentTitle.trim()) throw new Error('Assignment title is required.');
                const assignmentPayload = {
                    lesson_id: newLesson.id,
                    title: assignmentTitle.trim(),
                    description: assignmentDescription.trim(),
                    deadline: assignmentDeadline ? new Date(assignmentDeadline).toISOString() : null,
                    max_score: assignmentMaxScore,
                };

                const resAssignment = await fetch('/api/assignments', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(assignmentPayload),
                });

                const assignmentData = await resAssignment.json();
                if (!assignmentData.success) throw new Error(assignmentData.message || 'Failed to add assignment.');
            }

            // Reset fields after success
            setTitle('');
            setDuration('');
            setOrder('');
            setContentUrl('');
            setContentText('');
            setContentType('');
            setSelectedModuleId('');
            setIsFree(false);
            setQuizQuestions([{ question: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
            setAssignmentTitle('');
            setAssignmentDescription('');
            setAssignmentDeadline('');
            setAssignmentMaxScore(100);
            setError('');
            setMessage('Lesson and content added successfully!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Add Lessons to Modules</h2>
            <form onSubmit={handleAddLesson} className={styles.form}>
                <select
                    value={selectedModuleId}
                    onChange={(e) => setSelectedModuleId(e.target.value)}
                    className={styles.select}
                    required
                >
                    <option value="">Select Module</option>
                    {modules.map((mod) => (
                        <option key={mod.id} value={mod.id}>
                            {mod.order}. {mod.title}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    placeholder="Lesson Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className={styles.input}
                    required
                />

                <input
                    type="number"
                    placeholder="Duration (minutes)"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className={styles.input}
                    min="0"
                    required
                />

                <input
                    type="number"
                    placeholder="Order"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className={styles.input}
                    min="0"
                    required
                />

                <select
                    value={contentType}
                    onChange={(e) => setContentType(e.target.value)}
                    className={styles.select}
                    required
                >
                    <option value="">Select Content Type</option>
                    <option value="video">Video</option>
                    <option value="text">Text</option>
                    <option value="quiz">Quiz</option>
                    <option value="assignment">Assignment</option>
                </select>

                {/* Conditional Inputs */}
                {contentType === 'video' && (
                    <input
                        type="text"
                        placeholder="Video URL"
                        value={contentUrl}
                        onChange={(e) => setContentUrl(e.target.value)}
                        className={styles.input}
                        required
                    />
                )}

                {contentType === 'text' && (
                    <textarea
                        placeholder="Enter Text Content"
                        value={contentText}
                        onChange={(e) => setContentText(e.target.value)}
                        className={styles.textarea}
                        required
                    />
                )}

                {contentType === 'quiz' && (
                    <div className={styles.quizSection}>
                        <h3>Quiz Questions</h3>
                        {quizQuestions.map((q, idx) => (
                            <QuizQuestionInput
                                key={idx}
                                questionIndex={idx}
                                questionData={q}
                                onChange={updateQuizQuestion}
                                onRemove={removeQuizQuestion}
                            />
                        ))}
                        <button type="button" onClick={addQuizQuestion} className={styles.addButton}>
                            Add Another Question
                        </button>
                    </div>
                )}

                {contentType === 'assignment' && (
                    <div className={styles.assignmentSection}>
                        <input
                            type="text"
                            placeholder="Assignment Title"
                            value={assignmentTitle}
                            onChange={(e) => setAssignmentTitle(e.target.value)}
                            className={styles.input}
                            required
                        />
                        <textarea
                            placeholder="Assignment Description"
                            value={assignmentDescription}
                            onChange={(e) => setAssignmentDescription(e.target.value)}
                            className={styles.textarea}
                        />
                        <input
                            type="datetime-local"
                            placeholder="Deadline"
                            value={assignmentDeadline}
                            onChange={(e) => setAssignmentDeadline(e.target.value)}
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Max Score"
                            value={assignmentMaxScore}
                            onChange={(e) => setAssignmentMaxScore(e.target.value)}
                            className={styles.input}
                            min="1"
                            required
                        />
                    </div>
                )}

                <label className={styles.checkboxLabel}>
                    <input
                        type="checkbox"
                        checked={isFree}
                        onChange={() => setIsFree(!isFree)}
                    />
                    Free Lesson?
                </label>

                {error && <p className={styles.error}>{error}</p>}
                {message && <p className={styles.success}>{message}</p>}

                <button type="submit" className={styles.button}>
                    Add Lesson
                </button>
            </form>

            <h3 className={styles.subheading}>Current Lessons</h3>
            <ul className={styles.lessonList}>
                {lessons.map((lesson) => (
                    <li key={lesson.id} className={styles.lessonItem}>
                        <strong>{lesson.order}.</strong> {lesson.title} ({lesson.content_type})
                    </li>
                ))}
            </ul>
            {console.log('onNext is:', typeof onNext)}

            <button
                className={styles.continueBtn}
                disabled={lessons.length === 0}
                onClick={() => {
                    onNext(lessons);
                    navigate('/instructor/Dashboard');
                }}
            >
                Finish
            </button>
        </div>
    );
};

export default LessonFormWithContent;
