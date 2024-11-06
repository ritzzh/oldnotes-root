const express = require('express');
const router = express.Router();
const MainControl = require('../controllers/MainController');

router.post('/login',MainControl.login);
router.post('/signup',MainControl.signup);
router.post('/profile',MainControl.profile);


module.exports = router;
