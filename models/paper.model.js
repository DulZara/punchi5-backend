const mongoose = require('mongoose');            // ← ADD THIS LINE

const PaperSchema = new mongoose.Schema({
    bundleId: { type: String, required: true, ref: 'Bundle' },
    paperId:  { type: String, required: true, unique: true },
    title:    { type: String, required: true },
    questions: [
      {
        questionId:    { type: String, required: true },
        questionText:  { type: Object, required: true },
        questionImage: { type: String, default: null },
        options:       [{ type: Object, required: true }],
        correctAnswer: { type: Number, required: true },
        explanation:   { type: Object }
      }
    ]
  }, { timestamps: true });
  
  module.exports = mongoose.model('Paper', PaperSchema);
  