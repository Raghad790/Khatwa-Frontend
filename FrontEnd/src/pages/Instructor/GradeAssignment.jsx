import { useState, useParams, useEffect } from "react";
import styles from "./GradeAssignment.module.css"

// pages/GradeAssignment.jsx
const GradeAssignment = () => {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [assignment, setAssignment] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [subsRes, assignRes] = await Promise.all([
                    fetch(`/api/assignments/${assignmentId}/submissions`),
                    fetch(`/api/assignments/${assignmentId}`)
                ]);

                const subsData = await subsRes.json();
                const assignData = await assignRes.json();

                setSubmissions(subsData.submissions);
                setAssignment(assignData);
                setSelectedSubmission(subsData.submissions[0] || null);
            } catch (error) {
                console.error("Failed to load data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [assignmentId]);

    const handleGradeSubmit = async (gradeData) => {
        try {
            const response = await fetch(
                `/api/submissions/${gradeData.submissionId}/grade`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(gradeData)
                }
            );

            await response.json();

            if (response.ok) {
                // Update local state
                setSubmissions(subs => subs.map(s =>
                    s.id === gradeData.submissionId
                        ? { ...s, grade: gradeData.grade, feedback: gradeData.feedback }
                        : s
                ));
                setSelectedSubmission(prev => ({
                    ...prev,
                    grade: gradeData.grade,
                    feedback: gradeData.feedback
                }));
            }
        } catch (error) {
            console.error("Grading failed:", error);
        }
    };

    if (loading) return <LoadingSpinner />;
    if (!assignment) return <Error message="Assignment not found" />;

    return (
        <div className={styles.gradeAssignmentPage}>
            <div className={styles.header}>
                <h1>Grading: {assignment.title}</h1>
                <GradeStatistics submissions={submissions} />
            </div>

            <div className={styles.gradingContainer}>
                <SubmissionList
                    submissions={submissions}
                    onSelectSubmission={setSelectedSubmission}
                />

                {selectedSubmission ? (
                    <GradingPanel
                        submission={selectedSubmission}
                        assignment={assignment}
                        onGradeSubmit={handleGradeSubmit}
                    />
                ) : (
                    <div className={styles.emptyState}>
                        <p>No submissions available for grading</p>
                    </div>
                )}
            </div>
        </div>
    );
};


export default GradeAssignment