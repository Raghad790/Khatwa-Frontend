// src/components/ui/enrollments/ViewCourseButton.jsx

import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./ViewCourseButton.module.css"; // Create this CSS file if needed

const ViewCourseButton = ({ courseId }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/course/${courseId}`);
    };

    return (
        <button className={style.enrollButton} onClick={handleView}>
            View
        </button>
    );
};

ViewCourseButton.propTypes = {
    courseId: PropTypes.number.isRequired,
};

export default ViewCourseButton;
