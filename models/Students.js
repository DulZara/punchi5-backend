const mongoose = require('mongoose');

// Helper to generate random 8-char string
function generateStudentId() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  const studentSchema = new mongoose.Schema({
    firebaseUid: { type: String, required: true },
    email: { type: String, required: true },
    name: String,
    school: String,
    parentContact: String,
    examYear: Number,
    birthday: Date,
    studentId: { type: String, unique: true }, // will be auto-set
    dashboard: {
      papersCompleted: { type: Number, default: 0 },
      averageScore: { type: Number, default: 0 },
      rank: { type: Number, default: 0 },
      progress: [Number]
    },
    accessBundles: [
      {
        bundleId: String,
        accessGivenAt: Date,
        grantedBy: String
      }
    ]
  });

  // Auto-generate studentId before saving
studentSchema.pre('save', async function (next) {
    if (!this.studentId) {
      let newId;
      let exists = true;
  
      // Keep generating until it's unique
      while (exists) {
        newId = generateStudentId();
        const found = await mongoose.models.Student.findOne({ studentId: newId });
        if (!found) exists = false;
      }
  
      this.studentId = newId;
    }
  
    next();
  });
  
  module.exports = mongoose.model('Student', studentSchema);
  