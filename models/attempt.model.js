const mongoose = require('mongoose');            // ← ADD THIS LINE

// models/attempt.model.js
const AttemptSchema = new mongoose.Schema({
    studentId:    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    bundleId:     { type: String, required: true, ref: 'Bundle' },
    paperId:      { type: String, required: true, ref: 'Paper' },
    startedAt:    { type: Date, default: Date.now },
    submittedAt:  { type: Date },
    answers:      [
      { questionId: String, selectedOption: Number, isCorrect: Boolean }
    ],
    score:        { type: Number },
    percentage:   { type: Number },
    totalTime:    { type: Number }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Attempt', AttemptSchema);
  