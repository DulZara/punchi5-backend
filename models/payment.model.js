const mongoose = require('mongoose');            // ← ADD THIS LINE

const PaymentSchema = new mongoose.Schema({
    studentId:      { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    bundleId:       { type: String, required: true, ref: 'Bundle' },
    amount:         { type: Number, required: true },
    currency:       { type: String, default: 'LKR' },
    paymentMethod:  { type: String, enum: ['PayHere','Manual'], required: true },
    payHereReference:{ type: String },
    status:         { type: String, enum: ['SUCCESS','FAILED','PENDING'], default: 'PENDING' },
    unlockedBy:     { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Payment', PaymentSchema);
  