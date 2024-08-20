const multer = require('multer');
const File = require('../models/File');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage }).single('file');

exports.uploadFile = (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.status(500).send({ message: 'Error uploading file' });
    }
    if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
    }

    const newFile = new File({
      filename: req.file.filename,
      originalname: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
    });

    newFile.save()
      .then(file => res.send({ message: 'File uploaded successfully', file }))
      .catch(error => res.status(500).send({ message: 'Error saving file to database', error }));
  });
};
