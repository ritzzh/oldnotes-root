// controllers/fileController.js
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');

const conn = mongoose.createConnection('mongodb://localhost:27017/fileupload', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

const storage = new GridFsStorage({
  url: 'mongodb://localhost:27017/fileupload',
  file: (req, file) => {
    return {
      filename: `${Date.now()}-${file.originalname}`,
      bucketName: 'uploads',
      metadata: {
        username: req.body.username,
        institute: req.body.institute,
      },
    };
  },
});

const upload = multer({ storage });

const uploadFile = (req, res) => {
  res.send('File uploaded successfully');
};

const getFiles = async (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files exist' });
    }
    res.json(files);
  });
};

const searchFiles = async (req, res) => {
  const query = req.query.query;
  gfs.files.find({
    $or: [
      { 'metadata.username': query },
      { 'metadata.institute': query },
    ],
  }).toArray((err, files) => {
    if (!files || files.length === 0) {
      return res.status(404).json({ err: 'No files exist' });
    }
    res.json(files);
  });
};

module.exports = { upload, uploadFile, getFiles, searchFiles };
