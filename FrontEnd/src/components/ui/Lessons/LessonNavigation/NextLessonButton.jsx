// src/components/LessonNavigation/NextLessonButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LessonNavigation.module.css";

const NextLessonButton = ({ lessonId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <button className={styles.navButton} onClick={handleClick}>
      Next Lesson →
    </button>
  );
};

export default NextLessonButton;
