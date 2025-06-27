const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  addCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/courseController');
const Course = require('../models/Course');

// ✅ Add new course (Admin only, with optional file, paid/free toggle)
router.post('/add', upload.single('file'), addCourse);

// ✅ Get all courses (public access)
router.get('/all', async (req, res) => {
  try {
    const all = await Course.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// ✅ Update existing course (Admin only, optional file)
router.put('/:id', upload.single('file'), updateCourse);

// ✅ Delete course (Admin only)
router.delete('/:id', deleteCourse);

module.exports = router;
