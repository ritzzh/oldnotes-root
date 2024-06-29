// src/components/FileSearch.js
import React, { useState } from "react";

function FileSearch() {
  const [query, setQuery] = useState("");
  const [files, setFiles] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/search?query=${query}`);
    const data = await response.json();
    setFiles(data);
  };

  return (
    <div className="file-search">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by username or institute"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="search-results">
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
    </div>
  );
}

export default FileSearch;
