// src/components/LessonNavigation/PrevLessonButton.js
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LessonNavigation.module.css";

const PrevLessonButton = ({ lessonId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lessons/${lessonId}`);
  };

  return (
    <button className={styles.navButton} onClick={handleClick}>
      ← Previous Lesson
    </button>
  );
};

export default PrevLessonButton;
