const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Course = require('../models/Course');
const { registerUser, loginUser } = require('../controllers/userController');

// Register & Login
router.post('/register', registerUser);
router.post('/login', loginUser);

// Get enrolled courses for a user
router.get('/:id/courses', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses');
    res.json(user.enrolledCourses);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get enrolled courses' });
  }
});

// ✅ Admin stats route (correct version — with enrollments)
router.get('/admin/stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalCourses = await Course.countDocuments();

    const enrolledUsers = await User.find({
      enrolledCourses: { $exists: true, $not: { $size: 0 } }
    });

    const totalEnrollments = enrolledUsers.reduce((acc, user) => acc + user.enrolledCourses.length, 0);

    res.json({ totalUsers, totalCourses, totalEnrollments });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ✅ User profile route
router.get('/:id/profile', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate('enrolledCourses');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      enrolledCount: user.enrolledCourses.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});
// ✅ Add this to userRoutes.js
router.get('/admin/users', async (req, res) => {
  try {
    const users = await User.find({}, 'name email role');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


module.exports = router;
