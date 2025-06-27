const Comment = require('../models/Comment');
const User = require('../models/User');

// GET /api/comments/:courseId  -> all comments for a course
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ courseId: req.params.courseId })
      .sort({ createdAt: -1 })
      .populate('userId', 'name');       // we only need the commenter’s name
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// POST /api/comments          -> add a comment
// body: { courseId, userId, text }
exports.addComment = async (req, res) => {
  const { courseId, userId, text } = req.body;
  if (!text?.trim()) return res.status(400).json({ message: 'Empty comment' });

  try {
    // (Optional) quick sanity check that user & course exist
    // await Promise.all([User.exists({ _id: userId }), Course.exists({ _id: courseId })]);

    const comment = await Comment.create({ courseId, userId, text });
    const populated = await comment.populate('userId', 'name');
    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add comment' });
  }
};
