import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

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
    <div className="search-component">
      <div className="row mt-3 justify-content-center">
      <form class="col-8 d-flex" role="search">
        <input
          class="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchFiles();
          }}
        />
        <button class="btn btn-outline-success" type="submit">
          <SearchIcon></SearchIcon>
        </button>
      </form>
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
