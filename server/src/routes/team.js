const router = require('express').Router();
const TeamMember = require('../models/TeamMember');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ order: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('photo'), async (req, res) => {
  try {
    const { name, role, bio, email, facebook, instagram, linkedin } = req.body;
    const member = await TeamMember.create({
      name, role, bio, email, facebook, instagram, linkedin,
      photo: req.file ? { url: req.file.path, publicId: req.file.filename } : undefined,
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, upload.single('photo'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.photo = { url: req.file.path, publicId: req.file.filename };
    const member = await TeamMember.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(member);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await TeamMember.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
