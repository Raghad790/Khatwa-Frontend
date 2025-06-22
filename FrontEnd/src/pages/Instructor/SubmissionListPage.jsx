import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../../components/layout/InstructorLayout/footer";
import Header from "../../components/layout/InstructorLayout/header";
import Sidebar from "../../components/ui/SideBar/InstructorSideBar";
import styles from './SubmissionListPage.module.css';
import SubmissionList from '../../components/ui/Instrcutor/SubmissionList';  // <<<<< Add this import

function SubmissionListPage() {
    const { assignmentId } = useParams();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`/api/assignments/${assignmentId}/submissions`);
                if (!response.ok) {
                    const text = await response.text();
                    console.error('Error response:', text);
                    throw new Error(`HTTP ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched submissions data:', data);
                console.log('Assignment ID from route:', assignmentId);

                // Check if the API returns a wrapper like { success, data }
                setSubmissions(Array.isArray(data.data) ? data.data : data);
            } catch (err) {
                setError(err.message || 'Failed to load submissions');
                console.error('Submission fetch error:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSubmissions();
    }, [assignmentId]);


    const handleSelectSubmission = (submission) => {
        console.log('Selected submission:', submission);
    };

    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>{error}</div>;

    return (
        <>
            <Header />
            <Sidebar />
            <main className={styles.mainContent}>
                <SubmissionList
                    submissions={submissions}
                    onSelectSubmission={handleSelectSubmission}
                />
            </main>
            <Footer />
        </>
    );
}

export default SubmissionListPage;
