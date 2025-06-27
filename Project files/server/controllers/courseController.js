const fs = require('fs');
const path = require('path');
const Course = require('../models/Course');
const User = require('../models/User'); // For role check

// ✅ Add Course (Admin only)
const addCourse = async (req, res) => {
  const { title, description, category, userId } = req.body || {};
  const file = req.file ? req.file.filename : null;

  try {
    const uploader = await User.findById(userId);
    if (!uploader || uploader.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can upload courses' });
    }

    const course = await Course.create({
      title,
      description,
      category,
      file,
      uploadedBy: userId
    });

    res.status(201).json(course);
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    res.status(500).json({ error: 'Failed to add course' });
  }
};

// ✅ Update Course (including optional file update + cleanup)
const updateCourse = async (req, res) => {
  const { title, description, category, userId } = req.body || {};
  const file = req.file ? req.file.filename : null;

  console.log("REQ.BODY:", req.body);  // Debugging
  console.log("REQ.FILE:", req.file);  // Debugging

  try {
    const user = await User.findById(userId);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Only admins can update courses' });
    }

    const updateData = { title, description, category };

    if (file) {
      const oldCourse = await Course.findById(req.params.id);
      if (oldCourse?.file) {
        const oldPath = path.join(__dirname, '../uploads', oldCourse.file);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.file = file;
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    console.error('UPDATE ERROR:', err);
    res.status(500).json({ error: 'Failed to update course' });
  }
};

// ✅ Delete Course (including file cleanup)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course?.file) {
      const filePath = path.join(__dirname, '../uploads', course.file);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (err) {
    console.error('DELETE ERROR:', err);
    res.status(500).json({ error: 'Failed to delete course' });
  }
};

module.exports = {
  addCourse,
  updateCourse,
  deleteCourse
};
