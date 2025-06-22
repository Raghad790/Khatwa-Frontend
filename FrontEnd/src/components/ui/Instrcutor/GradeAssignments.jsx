// components/Instructor/GradeAssignments.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GradeAssignments.module.css';

const GradeAssignments = () => {
    const { assignmentId } = useParams();
    const [data, setData] = useState({
        submissions: [],
        assignment: null,
        total: 0,
        loading: true,
        error: ''
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10
    });

    const fetchSubmissions = async () => {
        try {
            setData(prev => ({ ...prev, loading: true }));
            const res = await fetch(
                `/api/assignments/${assignmentId}/submissions?page=${pagination.page}&limit=${pagination.limit}`,
                { credentials: 'include' }
            );
            const result = await res.json();

            if (!res.ok) throw new Error(result.error || 'Failed to fetch submissions');

            setData({
                submissions: result.submissions,
                assignment: result.assignment,
                total: result.total,
                loading: false,
                error: ''
            });
        } catch (err) {
            setData(prev => ({ ...prev, loading: false, error: err.message }));
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, [assignmentId, pagination.page, pagination.limit]);

    const handleGradeSubmit = async (submissionId, gradeData) => {
        try {
            const res = await fetch(`/api/assignments/submissions/${submissionId}/grade`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(gradeData)
            });

            const result = await res.json();

            if (!res.ok) throw new Error(result.error || 'Failed to submit grade');

            setData(prev => ({
                ...prev,
                submissions: prev.submissions.map(sub =>
                    sub.id === submissionId
                        ? { ...sub, ...result.submission }
                        : sub
                )
            }));
        } catch (err) {
            setData(prev => ({ ...prev, error: err.message }));
        }
    };

    if (data.loading) return <div className={styles.loading}>Loading submissions...</div>;
    if (data.error) return <div className={styles.error}>Error: {data.error}</div>;

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h2>Grade Submissions: {data.assignment?.title}</h2>
                <div className={styles.stats}>
                    <span>Total Submissions: {data.total}</span>
                    <Pagination
                        total={data.total}
                        current={pagination.page}
                        limit={pagination.limit}
                        onChange={page => setPagination(prev => ({ ...prev, page }))}
                    />
                </div>
            </header>

            {data.submissions.length === 0 ? (
                <p>No submissions yet</p>
            ) : (
                <div className={styles.submissionsList}>
                    {data.submissions.map(submission => (
                        <SubmissionItem
                            key={submission.id}
                            submission={submission}
                            assignment={data.assignment}
                            onGradeSubmit={handleGradeSubmit}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const SubmissionItem = ({ submission, onGradeSubmit }) => {
    const [gradeData, setGradeData] = useState({
        grade: submission.grade || '',
        feedback: submission.feedback || ''
    });
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onGradeSubmit(submission.id, gradeData);
        setIsEditing(false);
    };

    return (
        <div className={styles.submissionCard}>
            <div className={styles.studentInfo}>
                <h3>{submission.student_name}</h3>
                <span>{submission.email}</span>
                <time>Submitted: {new Date(submission.submitted_at).toLocaleString()}</time>
            </div>

            <div className={styles.submissionContent}>
                {submission.submission_url ? (
                    <a
                        href={submission.submission_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.submissionLink}
                    >
                        View Submission
                    </a>
                ) : (
                    <p>No submission file attached</p>
                )}
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit} className={styles.gradeForm}>
                    <div className={styles.gradeInputs}>
                        <label>
                            Grade (0-100):
                            <input
                                type="number"
                                min="0"
                                max="100"
                                value={gradeData.grade}
                                onChange={(e) => setGradeData({ ...gradeData, grade: e.target.value })}
                                required
                            />
                        </label>
                        <label>
                            Feedback:
                            <textarea
                                value={gradeData.feedback}
                                onChange={(e) => setGradeData({ ...gradeData, feedback: e.target.value })}
                            />
                        </label>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" className={styles.primaryButton}>Save</button>
                        <button
                            type="button"
                            className={styles.secondaryButton}
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className={styles.gradeDisplay}>
                    <div className={styles.gradeSummary}>
                        <span>Grade: {submission.grade || 'Not graded'}</span>
                        {submission.feedback && (
                            <div className={styles.feedback}>
                                <h4>Feedback:</h4>
                                <p>{submission.feedback}</p>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={() => setIsEditing(true)}
                        className={styles.primaryButton}
                    >
                        {submission.grade ? 'Edit Grade' : 'Add Grade'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default GradeAssignments;