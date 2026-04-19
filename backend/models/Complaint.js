const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  idString: { type: String, required: true },
  washroomId: { type: String, required: true },
  issueType: { type: String, required: true },
  status: { type: String, default: 'Pending Response' }, // Pending / Assigned to X / Resolved
  reportedBy: { type: String, default: 'Staff Member' },
  createdAt: { type: String, required: true }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
