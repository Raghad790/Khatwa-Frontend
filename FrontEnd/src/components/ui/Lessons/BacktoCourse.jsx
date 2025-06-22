// components/BackToCoursesButton.jsx
import { useNavigate } from 'react-router-dom';
import styles from './LessonNavButton.module.css';

const BackToCoursesButton = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/my-courses');
    };

    return (
        <button className={styles.button} onClick={handleBack}>
            ← Back to Dashboard
        </button>
    );
};

export default BackToCoursesButton;
