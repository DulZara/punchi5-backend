const mongoose = require('mongoose');            // ← ADD THIS LINE

// models/purchase.model.js
const PurchaseSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    bundleId:  { type: String, required: true, ref: 'Bundle' },
    paymentId: { type: String, required: true },
    status:    { type: String, enum: ['LOCKED','UNLOCKED'], default: 'LOCKED' },
    unlockedAt:{ type: Date }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Purchase', PurchaseSchema);