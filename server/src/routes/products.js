const router = require('express').Router();
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/admin', protect, async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    const { name, category, description, price, variants, stock } = req.body;
    const product = await Product.create({
      name, category, description,
      price: Number(price),
      variants: JSON.parse(variants || '[]'),
      stock: Number(stock || 0),
      image: req.file ? { url: req.file.path, publicId: req.file.filename } : undefined,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:id', protect, upload.single('image'), async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.price) updates.price = Number(updates.price);
    if (updates.stock) updates.stock = Number(updates.stock);
    if (updates.variants) updates.variants = JSON.parse(updates.variants);
    if (req.file) updates.image = { url: req.file.path, publicId: req.file.filename };
    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
