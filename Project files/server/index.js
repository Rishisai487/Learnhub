const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const mime = require('mime-types');

dotenv.config();
const app = express();

// 🔐 Middleware for serving uploaded files with preview support
const setHeaders = (res, filePath) => {
  const contentType = mime.lookup(filePath) || 'application/octet-stream';
  res.setHeader('Content-Type', contentType);

  // Let browser preview instead of forcing download
  res.setHeader('Content-Disposition', 'inline');
};

app.use('/uploads', express.static(path.join(__dirname, 'uploads'), { setHeaders }));

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enroll', require('./routes/enrollRoutes'));

// MongoDB connection and server start
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB connection error:', err);
  });
