import React, { useState } from 'react';
import styles from './SubmissionList.module.css';
import StatusBadge from './StatusBadge';
import GradeIndicator from './GradeIndicator';

// Utility function to check lateness
const isLate = (submittedAt, dueDate) => {
    if (!dueDate) return false;
    return new Date(submittedAt) > new Date(dueDate);
};

const SubmissionList = ({ submissions, onSelectSubmission }) => {
    // State to track grades input by user keyed by submission id
    const [grades, setGrades] = useState({});

    // Handler to update input value state
    const handleGradeChange = (submissionId, value) => {
        setGrades(prev => ({ ...prev, [submissionId]: value }));
    };

    // Handler to submit the grade to backend API
    const handleGradeSubmit = async (submissionId, grade) => {
        if (!grade || isNaN(grade)) {
            alert('Please enter a valid grade');
            return;
        }

        try {
            const res = await fetch(`/api/submissions/${submissionId}/grade`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grade: Number(grade) }),
            });

            if (!res.ok) {
                const errorText = await res.text();
                throw new Error(errorText || 'Failed to submit grade');
            }

            const result = await res.json();
            console.log('Grade submitted:', result);

            // Optionally: refresh submissions or update state here for immediate UI feedback
            alert('Grade submitted successfully');
        } catch (err) {
            console.error('Grade submission error:', err);
            alert('Failed to submit grade: ' + err.message);
        }
    };

    return (
        <div className={styles.submissionList}>
            <h3>Submissions ({submissions.length})</h3>
            <div className={styles.tableHeader}>
                <span>Student</span>
                <span>Submitted</span>
                <span>Status</span>
                <span>Grade</span>
            </div>
            {submissions.map(submission => {
                return (
                    <div
                        key={submission.id}
                        className={styles.submissionRow}
                        onClick={() => onSelectSubmission(submission)}
                    >
                        <div className={styles.studentCell}>
                            <div>
                                <p>{submission.student_name}</p>
                                <small>{submission.email}</small>
                            </div>
                        </div>

                        <div className={styles.dateCell}>
                            {new Date(submission.submitted_at).toLocaleString()}
                        </div>

                        <div className={styles.statusCell}>
                            <StatusBadge
                                graded={submission.grade !== null}
                                late={isLate(submission.submitted_at, submission.due_date)}
                            />
                        </div>

                        <div className={styles.gradeCell}>
                            {submission.grade !== null ? (
                                <GradeIndicator grade={submission.grade} />
                            ) : (
                                <>
                                    <input
                                        type="number"
                                        min="0"
                                        max="100"
                                        placeholder="Enter grade"
                                        className={styles.gradeInput}
                                        value={grades[submission.id] || ''}
                                        onChange={e => handleGradeChange(submission.id, e.target.value)}
                                        onClick={e => e.stopPropagation()} // prevent triggering row click
                                    />
                                    <button
                                        className={styles.gradeBtn}
                                        onClick={e => {
                                            e.stopPropagation(); // prevent triggering row click
                                            handleGradeSubmit(submission.id, grades[submission.id]);
                                        }}
                                    >
                                        Submit
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SubmissionList;
