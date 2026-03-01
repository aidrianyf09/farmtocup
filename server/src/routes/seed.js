const router = require('express').Router();
const Admin = require('../models/Admin');

// Debug endpoint to check environment variables
router.get('/check-env', (_req, res) => {
  try {
    res.json({
      hasMongoUri: !!process.env.MONGODB_URI,
      hasAdminEmail: !!process.env.ADMIN_SEED_EMAIL,
      hasAdminPassword: !!process.env.ADMIN_SEED_PASSWORD,
      mongoUriPrefix: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + '...' : 'NOT SET'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// One-time seed endpoint (can only be called once)
router.post('/admin', async (_req, res) => {
  try {
    const existing = await Admin.findOne({ email: process.env.ADMIN_SEED_EMAIL });
    if (existing) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const admin = await Admin.create({
      name: 'Farm to Cup Admin',
      email: process.env.ADMIN_SEED_EMAIL,
      password: process.env.ADMIN_SEED_PASSWORD,
    });

    res.json({
      message: 'Admin user created successfully',
      email: admin.email
    });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ message: 'Server error', error: err.message, stack: err.stack });
  }
});

module.exports = router;
