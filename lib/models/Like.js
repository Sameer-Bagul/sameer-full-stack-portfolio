const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  pinId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pin', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Prevent duplicate likes
likeSchema.index({ userId: 1, pinId: 1 }, { unique: true });

module.exports = mongoose.models.Like || mongoose.model('Like', likeSchema);
