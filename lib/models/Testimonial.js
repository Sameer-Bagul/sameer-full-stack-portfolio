const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  content: {
    type: String,
  },
  author: {
    type: String,
  },
  position: {
    type: String,
  },
  image: {
    type: String,
    default: '',
  },
  socialUrl: {
    type: String,
    default: '',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  sequence: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.Testimonial || mongoose.model('Testimonial', testimonialSchema);
