import React, { useState } from 'react';
import styles from './AssignmentSubmission.module.css';

const AssignmentSubmission = ({ lessonId }) => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        const selected = e.target.files[0];
        if (selected && selected.type === 'application/pdf') {
            setFile(selected);
            setMessage('');
        } else {
            setMessage('Only PDF files are allowed.');
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('assignment', file);

        try {
            const response = await fetch(`/api/lessons/${lessonId}/submit-assignment`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            const data = await response.json();
            setMessage(data.message || 'Uploaded successfully.');
        } catch (err) {
            console.error(err);
            setMessage('Upload failed.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <label className={styles.label}>Upload your PDF assignment:</label>
                <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.input} />
                <button type="submit" disabled={uploading || !file} className={styles.button}>
                    {uploading ? 'Uploading...' : 'Submit Assignment'}
                </button>
            </form>
            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default AssignmentSubmission;
