const File = require('../models/File');
const User = require('../models/User');  // Assuming you have a User model

// Controller function to handle file upload
const uploadFile = async (req, res) => {
  try {
    const username = req.body.userId; 

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    // Find the user by username to get the ObjectId
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create a new File document with details from the uploaded file
    const newFile = new File({
      filename: req.file.originalname,
      filepath: req.file.path,
      filetype: req.file.mimetype,
      size: req.file.size,
      user: user._id,  // Save the user's ObjectId with the file
    });

    // Save file information in the database
    await newFile.save();

    // Send success response
    res.json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
};

// Controller function to fetch files by user ID
const getFilesByUser = async (req, res) => {
  try {
    const username = req.body.username;  
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const files = await File.find({ user: user._id });

    if (files.length === 0) {
      return res.status(404).json({ message: 'No files found for this user' });
    }

    res.json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ message: 'Error fetching files' });
  }
};

// Controller function to handle file download
const downloadFile = async (req, res) => {
  try {
    const fileId = req.params.id;  // Get file ID from route parameters

    // Find the file by its ID
    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Send the file for download
    res.download(file.filepath, file.filename);
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ message: 'Error downloading file' });
  }
};

module.exports = { uploadFile, getFilesByUser, downloadFile };
