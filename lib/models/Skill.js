const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'tools', 'devops', 'design', 'other'],
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  row: {
    type: Number,
    enum: [1, 2],
    default: 1,
    required: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.Skill || mongoose.model('Skill', skillSchema);
