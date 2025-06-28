import { useState } from "react";
import api from "../../services/api";

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadFile = async (file, lessonId = null) => {
    setUploading(true);
    setError(null);
    const formData = new FormData();
    formData.append("file", file);
    if (lessonId) formData.append("lesson_id", lessonId);

    let endpoint = lessonId ? "/upload/lesson/file" : "/upload";
    try {
      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      setUploading(false);
      return res.data.data; // Your backend sends { success, message, data }
    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.message || "Upload failed");
      return null;
    }
  };

  return { uploadFile, uploading, error };
};
