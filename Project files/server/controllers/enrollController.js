const User = require('../models/User');

const enrollInCourse = async (req, res) => {
  const { userId, courseId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ message: 'Already enrolled' });
    }

    user.enrolledCourses.push(courseId);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Enrollment failed' });
  }
};

module.exports = { enrollInCourse };
