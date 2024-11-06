import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function DisplayNotes() {
  const { username } = useSelector((state) => state.user);
  const { baseURL } = useSelector((state) => state.baseURL|"");
  const [state, setState] = useState({
    files: [],
    error: "",
    loading: true,
  });

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${baseURL}/api/files/user`, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username:username }),
        });
        if (!response.ok) throw new Error("Failed to fetch files");
        const data = await response.json();
        setState({ files: data, error: "", loading: false });
      } catch (error) {
        setState({ files: [], error: "Error fetching files", loading: false });
      }
    };

    fetchFiles();
  }, [username,baseURL]);

  const handleDownload = (fileId) => {
    // Download file by ID
    window.location.href = `${baseURL}/api/files/download/${fileId}`;
  };

  // Destructure state for cleaner usage
  const { files, error, loading } = state;

  // Handle loading state
  if (loading) return <div className="file-display-container">Loading...</div>;

  // Handle error state
  if (error) return <div className="file-display-container error">{error}</div>;

  // Handle empty state
  if (files.length === 0)
    return <div className="file-display-container">No files uploaded yet.</div>;

  // Render file grid when files are present
  return (
    <div className="file-display-container">
      <h2>Uploaded Files</h2>
      <div className="file-grid">
        {files.map((file) => (
          <div
            key={file._id}
            className="file-tile"
            onClick={() => handleDownload(file._id)}
          >
            <p>{file.filename}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayNotes;
