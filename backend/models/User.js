const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'teacher', 'admin'], default: 'student' },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  
  // Student Specific
  course: { type: String, default: 'Not Enrolled' },
  feeStatus: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  feeAmount: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
