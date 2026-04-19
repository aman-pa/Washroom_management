const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Washroom = require('../models/Washroom');
const Activity = require('../models/Activity');
const { verifyToken, checkRole } = require('../middleware/auth');

// Get all complaints
router.get('/', verifyToken, async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ _id: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create new complaint (Staff)
router.post('/', verifyToken, async (req, res) => {
  try {
    const { washroomId, issueType } = req.body;
    const newId = '#100' + (Math.floor(Math.random() * 90) + 10);
    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    
    const complaint = new Complaint({
      idString: newId,
      washroomId,
      issueType,
      reportedBy: req.userName,
      createdAt: timeStr
    });
    await complaint.save();

    // Mark washroom dirty
    const washroom = await Washroom.findOne({ idString: washroomId });
    if(washroom) {
      washroom.status = 'Dirty';
      await washroom.save();
    }

    await new Activity({ time: timeStr, message: `New issue reported at ${washroomId}: ${issueType} by ${req.userName}` }).save();

    res.status(201).json({ message: 'Complaint created', complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Resolve or assign complaint (Admin / Supervisor / Staff)
router.put('/:id', verifyToken, checkRole(['admin', 'supervisor', 'staff']), async (req, res) => {
  try {
    const { status } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

    complaint.status = status;
    await complaint.save();

    const timeStr = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    await new Activity({ time: timeStr, message: `Complaint ${complaint.idString} status updated to ${status} by ${req.userName}.` }).save();

    res.json({ message: 'Complaint updated', complaint });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
