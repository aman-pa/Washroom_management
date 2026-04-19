const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: String, required: true },
  isRead: { type: Boolean, default: false }
});

module.exports = mongoose.model('Message', MessageSchema);
