const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const Course = require('../models/Course');

// Upload course with file
router.post('/add', upload.single('file'), addCourse);

// Get all courses
router.get('/all', async (req, res) => {
  try {
    const all = await Course.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// ✅ Update course (with optional file)
router.put('/:id', upload.single('file'), updateCourse);

// Delete course
router.delete('/:id', deleteCourse);

module.exports = router;
