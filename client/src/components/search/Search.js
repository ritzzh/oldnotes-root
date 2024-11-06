import React, { useState } from "react";
import search_icon from "../assets/search.png";
import "./Search.css";

function Search() {
  const [username, setUsername] = useState("");
  const [state, setState] = useState({
    files: [],
  });

  const fetchFiles = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/files/user`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username }),
      });
      if (!response.ok) throw new Error("Failed to fetch files");
      const data = await response.json();
      setState({ files: data });
    } catch (error) {
      setState({ files: [] });
    }
  };

  const handleDownload = (fileId) => {
    // Download file by ID
    window.location.href = `http://localhost:4000/api/files/download/${fileId}`;
  };

  // Destructure state for cleaner usage
  const { files } = state;

  return (
    <div className="search">
      <div className="file-search-container">
        <input
          type="text"
          className="fileinput"
          placeholder="search"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchFiles();
          }}
        ></input>
        <div className="search-icon">
          <img
            className="inputsearch"
            src={search_icon}
            alt="alt"
            onClick={() => {
              fetchFiles();
            }}
          ></img>
        </div>
      </div>
      {files.length !== 0 ? (
        <div className="file-display-container">
          <h2>Files that match your description</h2>
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
      ) : (
        <div className="file-display-container">Nothing to Display</div>
      )}
    </div>
  );
}
export default Search;
