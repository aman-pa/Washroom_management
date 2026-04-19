const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  time: { type: String, required: true },
  message: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
});

module.exports = mongoose.model('Activity', ActivitySchema);
