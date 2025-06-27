const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now},
  file: { type: String }
});

module.exports = mongoose.model('Course', courseSchema);
