const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, default: '/images/photo.jpg' },
  experience: { type: String, default: '0 Years' },
  students: { type: Number, default: 0 },
  rating: { type: Number, default: 5.0 },
  bio: { type: String, default: 'Newly onboarded faculty member.' },
  phone: { type: String, default: 'N/A' },
  email: { type: String, default: 'N/A' },
  address: { type: String, default: 'N/A' }
}, { timestamps: true });

module.exports = mongoose.model('Teacher', teacherSchema);
