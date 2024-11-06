const express = require('express');
const multer = require('multer');
const { uploadFile, getFilesByUser, downloadFile } = require('../controllers/FileController');

const router = express.Router();

// Set up multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // The folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Append timestamp to avoid duplicate names
  },
});

const upload = multer({ storage: storage });

// Route for file upload
router.post('/upload', upload.single('file'), uploadFile);

// Route to fetch files uploaded by a specific user
router.post('/user', getFilesByUser);

// Route to download a file by ID
router.get('/download/:id', downloadFile);

module.exports = router;
