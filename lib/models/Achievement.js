const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['award', 'certification', 'recognition'],
    default: 'award',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.Achievement || mongoose.model('Achievement', achievementSchema);
