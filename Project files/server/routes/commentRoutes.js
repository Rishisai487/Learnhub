const router = require('express').Router();
const { getComments, addComment } = require('../controllers/commentController');

router.get('/:courseId', getComments);
router.post('/', addComment);        // body: courseId, userId, text

module.exports = router;
