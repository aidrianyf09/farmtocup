const router = require('express').Router();
const SiteContent = require('../models/SiteContent');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne({ key: 'main' });
    if (!content) content = await SiteContent.create({ key: 'main' });
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/', protect, async (req, res) => {
  try {
    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { ...req.body },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/upload/:field', protect, upload.single('image'), async (req, res) => {
  try {
    const { field } = req.params;
    const allowedFields = ['heroImage', 'weddingsImage', 'birthdaysImage', 'farmToursImage', 'brandStoryImage'];
    if (!allowedFields.includes(field)) return res.status(400).json({ message: 'Invalid field' });

    const content = await SiteContent.findOneAndUpdate(
      { key: 'main' },
      { [field]: { url: req.file.path, publicId: req.file.filename } },
      { new: true, upsert: true }
    );
    res.json(content);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
