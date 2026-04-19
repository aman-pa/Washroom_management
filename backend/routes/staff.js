const express = require('express');
const router = express.Router();
const Washroom = require('../models/Washroom');
const Activity = require('../models/Activity');
const { verifyToken, checkRole } = require('../middleware/auth');

// List currently active staff
router.get('/list', verifyToken, checkRole(['admin', 'supervisor']), async (req, res) => {
  try {
    const User = require('../models/User'); // lazy require
    const staff = await User.find({ role: 'staff' }, 'name email role');
    res.json(staff);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark washroom clean (Staff specifically)
router.put('/clean/:id', verifyToken, checkRole(['staff']), async (req, res) => {
  try {
    const washroom = await Washroom.findOne({ idString: req.params.id });
    if (!washroom) return res.status(404).json({ error: 'Washroom not found' });

    washroom.status = 'Clean';
    washroom.lastCleanedTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    await washroom.save();

    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    await new Activity({ time: timeStr, message: `${req.params.id} marked as Clean by ${req.userName}.` }).save();

    res.json({ message: 'Washroom marked clean', washroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
