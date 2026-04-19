const mongoose = require('mongoose');

const WashroomSchema = new mongoose.Schema({
  idString: { type: String, required: true, unique: true }, // e.g. W-101
  location: { type: String, required: true },
  status: { type: String, enum: ['Clean', 'Dirty', 'Maintenance'], default: 'Dirty' },
  assignedStaff: { type: String, default: 'Unassigned' },
  lastCleanedTime: { type: String, default: 'Never' }
});

module.exports = mongoose.model('Washroom', WashroomSchema);
