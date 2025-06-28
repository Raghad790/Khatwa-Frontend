import React from "react";
import { useFileUpload } from "../../../hooks/Upload/useFileUpload";
import { Button, LinearProgress, Typography } from "@mui/material";

const FileUploader = ({ lessonId, onUpload }) => {
  const { uploadFile, uploading, error } = useFileUpload();

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadFile(file, lessonId);
    if (result && onUpload) onUpload(result);
  };

  return (
    <div>
      <Button variant="contained" component="label">
        Upload File
        <input type="file" hidden onChange={handleChange} />
      </Button>
      {uploading && <LinearProgress />}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default FileUploader;
