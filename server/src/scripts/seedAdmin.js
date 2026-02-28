require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const existing = await Admin.findOne({ email: process.env.ADMIN_SEED_EMAIL });
    if (!existing) {
      await Admin.create({
        name: 'Farm to Cup Admin',
        email: process.env.ADMIN_SEED_EMAIL,
        password: process.env.ADMIN_SEED_PASSWORD,
      });
      console.log('✅ Admin user created');
    } else {
      console.log('ℹ️  Admin already exists');
    }
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

seed();
