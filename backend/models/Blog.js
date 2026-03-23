const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  summary: { type: String, required: true },
  image: { type: String, default: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?w=600&h=400&fit=crop' },
  achievement: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
