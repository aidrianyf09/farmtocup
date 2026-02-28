const mongoose = require('mongoose');

const SiteContentSchema = new mongoose.Schema({
  key: { type: String, unique: true, required: true },
  heroHeadline: { type: String, default: 'Farm to Cup Philippines' },
  heroSubtitle: { type: String, default: 'Farm. Roast. Brew.' },
  heroImage: { url: String, publicId: String },
  weddingsTitle: { type: String, default: 'Private Events (Weddings)' },
  weddingsDesc: String,
  weddingsImage: { url: String, publicId: String },
  birthdaysTitle: { type: String, default: 'Birthday Parties' },
  birthdaysDesc: String,
  birthdaysImage: { url: String, publicId: String },
  farmToursTitle: { type: String, default: 'Private Farm Tours' },
  farmToursDesc: String,
  farmToursImage: { url: String, publicId: String },
  brandStoryText: String,
  brandStoryImage: { url: String, publicId: String },
  contactEmail: String,
  contactPhone: String,
  facebookUrl: String,
  instagramUrl: String,
  tiktokUrl: String,
  whatsappNumber: String,
  messengerUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('SiteContent', SiteContentSchema);
