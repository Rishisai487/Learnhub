const express = require('express');
const router = express.Router();
const { enrollInCourse } = require('../controllers/enrollController');

router.post('/enroll', enrollInCourse);

module.exports = router;
