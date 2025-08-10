const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true
  },
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  clicks: {
    type: Number,
    default: 0
  }
}, { timestamps: true }); // adds createdAt & updatedAt automatically

module.exports = mongoose.model('Url', UrlSchema);
