const router = require('express').Router();
const Farm = require('../models/Farm');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const farms = await Farm.find({ isActive: true }).sort({ order: 1 });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const farms = await Farm.find().sort({ order: 1 });
    res.json(farms);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/reorder', protect, async (req, res) => {
  try {
    const { orderedIds } = req.body;
    await Promise.all(orderedIds.map((id, index) => Farm.findByIdAndUpdate(id, { order: index })));
    res.json({ message: 'Reordered' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, region, description } = req.body;
    const farm = await Farm.create({
      name, region, description,
      image: req.file ? { url: req.file.path, publicId: req.file.filename } : undefined,
    });
    res.status(201).json(farm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.image = { url: req.file.path, publicId: req.file.filename };
    const farm = await Farm.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(farm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Farm.findByIdAndDelete(req.params.id);
    res.json({ message: 'Farm deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
