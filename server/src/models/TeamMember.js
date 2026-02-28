const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  bio: String,
  photo: { url: String, publicId: String },
  email: String,
  facebook: String,
  instagram: String,
  linkedin: String,
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
