import React from "react";
import styles from "./SubmissionList.module.css"
import { useState } from "react";

// components/Instructor/GradingPanel.jsx
const GradingPanel = ({ submission, assignment, onGradeSubmit }) => {
    const [grade, setGrade] = useState(submission.grade || '');
    const [feedback, setFeedback] = useState(submission.feedback || '');
    const [rubricScores, setRubricScores] = useState([]);

    const handleSubmit = () => {
        onGradeSubmit({
            submissionId: submission.id,
            grade: Number(grade),
            feedback,
            rubricScores
        });
    };

    return (
        <div className={styles.gradingPanel}>
            <div className={styles.submissionViewer}>
                <h3>{submission.student_name}'s Submission</h3>
                {submission.submission_url ? (
                    <FilePreview url={submission.submission_url} />
                ) : (
                    <p>Text submission: {submission.submission_text}</p>
                )}
            </div>

            <div className={styles.gradingForm}>
                <div className={styles.gradeInput}>
                    <label>Grade (0-100)</label>
                    <input
                        type="number"
                        min="0"
                        max="100"
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                </div>

                <div className={styles.feedbackInput}>
                    <label>Feedback</label>
                    <RichTextEditor
                        value={feedback}
                        onChange={setFeedback}
                        placeholder="Add detailed feedback..."
                    />
                </div>

                {assignment.rubric && (
                    <RubricGrader
                        rubric={assignment.rubric}
                        scores={rubricScores}
                        onChange={setRubricScores}
                    />
                )}

                <div className={styles.actions}>
                    <button
                        className={styles.saveButton}
                        onClick={handleSubmit}
                    >
                        Save Grade
                    </button>
                    <button className={styles.cancelButton}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};


export default GradingPanel;