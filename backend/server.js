require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parses incoming JSON requests

// Routes Setup
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const teacherRoutes = require('./routes/teachers');
const blogRoutes = require('./routes/blogs');
const studentRoutes = require('./routes/students');

// Basic Health Check Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Platform API is active and healthy.' });
});

// API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/students', studentRoutes);

// Port configuration
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Successfully connected to MongoDB.');
  // Start server only after DB connects
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port: ${PORT} (listening on 0.0.0.0)`);
  });
})
.catch((err) => {
  console.error('Error connecting to MongoDB database:', err.message);
  process.exit(1);
});
