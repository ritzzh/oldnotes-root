import React, { useState } from 'react';
import './Notes.css';
import DisplayNotes from './DisplayNotes';
import { useSelector } from 'react-redux';

const Notes = ({ baseURL }) => {
  const { username } = useSelector(state => state.user);  // Fetching username from Redux store
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState('');
  const [refreshFiles, setRefreshFiles] = useState(false); // State to trigger file list refresh

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    if (!selectedFile) {
      setMessage('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('userId', username); 

    fetch(`${baseURL}/api/files/upload`, {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setMessage(data.message);
        setRefreshFiles(!refreshFiles);  // Toggle refresh state to reload file list
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        setMessage('Error uploading file');
      });
  };

  return (
    <>
      <div className="file-upload-container">
        <h2>File Upload</h2>
        <input type="file" onChange={onFileChange} />
        <button onClick={onFileUpload}>Upload</button>
        <div className="message">{message}</div>
      </div>
      {/* Pass the username and refreshFiles to DisplayNotes to reload the list */}
      <DisplayNotes refreshFiles={refreshFiles} />
    </>
  );
};

export default Notes;
