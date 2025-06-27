const multer = require('multer');
const path = require('path');

// Set up where and how files are stored
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // ✅ Relative to root of server
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

module.exports = upload;
