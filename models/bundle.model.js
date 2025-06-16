// models/bundle.model.js
const mongoose = require('mongoose');

const BundleSchema = new mongoose.Schema({
  bundleId:    { type: String, required: true, unique: true },
  title:       { type: String, required: true },
  subject:     { type: String, required: true },
  price:       { type: Number, required: true },
  isPaid:      { type: Boolean, default: true },
  description: { type: String },
  totalPapers: { type: Number, default: 0 }
}, {
  timestamps: true
});

module.exports = mongoose.model('Bundle', BundleSchema);
