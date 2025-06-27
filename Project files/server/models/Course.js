const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  category: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  file: { type: String },

  // 💰 Paid course fields
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 }
});

module.exports = mongoose.model('Course', courseSchema);
