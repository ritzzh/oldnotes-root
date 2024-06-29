// src/components/FileDisplay.js
import React, { useState, useEffect } from "react";

function FileDisplay() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetch("http://localhost:5000/files");
      const data = await response.json();
      setFiles(data);
    };
    fetchFiles();
  }, []);

  return (
    <div className="file-display">
      {files.map((file) => (
        <div key={file._id} className="file-tile">
          <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
            {file.filename}
          </a>
          <p>Username: {file.username}</p>
          <p>Institute: {file.institute}</p>
          <p>Date: {new Date(file.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default FileDisplay;
