const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  location: {
    type: String,
  },
  role: {
    type: String,
  },
  bio: {
    type: String,
  },
  website: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.PersonalInfo || mongoose.model('PersonalInfo', personalInfoSchema);
