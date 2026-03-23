const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, default: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?w=600&h=400&fit=crop' },
  rating: { type: Number, default: 5.0 },
  students: { type: Number, default: 0 },
  duration: { type: String, default: 'Variable' },
  features: [{ type: String }]
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
