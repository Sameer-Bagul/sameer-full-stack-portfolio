const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  longContent: {
    type: String,
  },
  coverImage: {
    type: String,
    default: '',
  },
  category: {
    type: String,
  },
  author: {
    type: String,
    default: 'Sameer Bagul',
  },
  readingTime: {
    type: String,
  },
  tags: [{
    type: String,
  }],
  githubLink: {
    type: String,
    default: '',
  },
  blogLink: {
    type: String,
    default: '',
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  sequence: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
