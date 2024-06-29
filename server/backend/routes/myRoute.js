const express = require('express');
const router = express.Router();
const MainControl = require('../controllers/MainController');
const { upload, uploadFile, getFiles, searchFiles } = require('../controllers/fileController');

router.post('/login',MainControl.login);
router.post('/signup',MainControl.signup);
router.post('/profile',MainControl.profile);

router.post('/upload', upload.single('file'), uploadFile);
router.get('/files', getFiles);
router.get('/search', searchFiles);

module.exports = router;
