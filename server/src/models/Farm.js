const mongoose = require('mongoose');

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  region: { type: String, required: true },
  description: String,
  image: { url: String, publicId: String },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Farm', FarmSchema);
