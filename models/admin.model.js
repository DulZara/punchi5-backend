// models/admin.model.js
const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  uid:      { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  mobile:   { type: String, required: true },
  fullName: { type: String, required: true },
  role:     { type: String, default: 'admin' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Admin', AdminSchema);
