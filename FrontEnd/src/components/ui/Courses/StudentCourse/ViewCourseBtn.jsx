import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./ViewCourseButton.module.css";

const ViewCourseButton = ({ courseId, className }) => {
    const navigate = useNavigate();

    const handleView = () => {
        navigate(`/course/${courseId}`);
    };

    return (
        <button className={`${style.enrollButton} ${className || ""}`} onClick={handleView}>
            View
        </button>
    );
};

ViewCourseButton.propTypes = {
    courseId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    className: PropTypes.string,
};

export default ViewCourseButton;