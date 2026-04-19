const express = require('express');
const router = express.Router();
const Washroom = require('../models/Washroom');
const Activity = require('../models/Activity');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all washrooms (public - no auth needed for dashboard guest view)
router.get('/', async (req, res) => {
  try {
    const washrooms = await Washroom.find();
    res.json(washrooms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reset all washrooms to dirty (Admin or Supervisor)
router.put('/reset/all', verifyToken, checkRole(['admin', 'supervisor']), async (req, res) => {
  try {
    await Washroom.updateMany({}, { status: 'Dirty', lastCleanedTime: 'Never' });
    
    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    await new Activity({ time: timeStr, message: `${req.userName} (${req.userRole}) reset all washrooms to Dirty for new day.` }).save();
    
    res.json({ message: 'All washrooms reset to dirty.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update washroom assignment or status (Admin / Supervisor)
router.put('/:id', verifyToken, checkRole(['admin', 'supervisor']), async (req, res) => {
  try {
    const { status, assignedStaff } = req.body;
    const washroom = await Washroom.findOne({ idString: req.params.id });
    if (!washroom) return res.status(404).json({ error: 'Washroom not found' });

    if (status) {
      washroom.status = status;
      if (status === 'Clean') {
        washroom.lastCleanedTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      }
    }
    
    if (assignedStaff) {
      washroom.assignedStaff = assignedStaff;
      const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
      await new Activity({ time: timeStr, message: `${req.userName} assigned ${assignedStaff} to ${washroom.location}.` }).save();
    }

    await washroom.save();
    res.json({ message: 'Washroom updated', washroom });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
