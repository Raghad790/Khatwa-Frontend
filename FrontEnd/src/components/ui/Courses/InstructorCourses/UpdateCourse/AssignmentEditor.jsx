import React, { useState, useEffect } from "react";
import FileUploader from "../../../Upload/FileUploader";
import styles from "./EditLessons.module.css";

const AssignmentEditor = ({ lessonId }) => {
  // File upload state
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // Handle file upload callback
  const handleFileUpload = (fileData) => {
    setUploadedFiles((prev) => [...prev, fileData]);
  };
  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    deadline: "",
    max_score: 100,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lessonId) return;

    const fetchAssignment = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/lessons/${lessonId}/assignment`);
        const data = await response.json();
        if (data.success && data.data) {
          setAssignment({
            title: data.data.title,
            description: data.data.description,
            deadline: data.data.deadline
              ? data.data.deadline.substring(0, 16)
              : "",
            max_score: data.data.max_score,
          });
        }
      } catch (error) {
        console.error("Error fetching assignment:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [lessonId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAssignment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Implement your save logic here
      console.log("Assignment to save:", assignment);
      // Add your API call logic here
    } catch (error) {
      console.error("Error saving assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.assignmentEditor}>
      <h4>Assignment Details</h4>

      <div className={styles.formGroup}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          value={assignment.title}
          onChange={handleChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Description</label>
        <textarea
          name="description"
          value={assignment.description}
          onChange={handleChange}
          rows={5}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label>Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={assignment.deadline}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Max Score</label>
          <input
            type="number"
            name="max_score"
            value={assignment.max_score}
            onChange={handleChange}
            min="1"
          />
        </div>
      </div>

      {/* FileUploader for assignment files */}
      <div className={styles.formGroup}>
        <label>Upload Assignment Files</label>
        <FileUploader lessonId={lessonId} onUpload={handleFileUpload} />
        {uploadedFiles.length > 0 && (
          <ul style={{ marginTop: 8 }}>
            {uploadedFiles.map((file, idx) => (
              <li key={file.public_id || idx}>
                <a
                  href={file.secure_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {file.original_name || file.secure_url}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        onClick={handleSave}
        disabled={loading}
        className={styles.saveButton}
      >
        {loading ? "Saving..." : "Save Assignment"}
      </button>
    </div>
  );
};

export default AssignmentEditor;
