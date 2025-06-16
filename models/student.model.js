// models/student.model.js
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  uid:        { type: String, required: true, unique: true },
  email:      { type: String, required: true, unique: true },
  mobile:     { type: String, required: true },
  fullName:   { type: String, required: true },
  school:     { type: String },
  district:   { type: String },
  isVerified: { type: Boolean, default: false },
  studentDetails: {
    examYear:     { type: Number },
    examAttempt:  { type: Number },
    subjects:     [String],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
