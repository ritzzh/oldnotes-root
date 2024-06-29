// src/components/FileUpload.js
import React, { useState } from "react";


function FileUpload({username,institute}) {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("username", username);
    formData.append("institute", institute);

    const response = await fetch("http://localhost:4000/api/upload", {
        method: "POST",
        body: formData,
      });
  
      if (response.ok) {
        alert("File uploaded successfully");
      } else {
        alert("Failed to upload file");
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        required
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default FileUpload;

