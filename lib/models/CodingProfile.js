const mongoose = require('mongoose');

const codingProfileSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['leetcode', 'hackerrank', 'codeforces', 'codechef', 'linkedin'],
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  accessToken: {
    type: String,
  },
}, {
  timestamps: true,
});

codingProfileSchema.index({ platform: 1, username: 1 }, { unique: true });

module.exports = mongoose.models.CodingProfile || mongoose.model('CodingProfile', codingProfileSchema);
