// models/notification.model.js
const NotificationSchema = new mongoose.Schema({
    studentId:    { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Student' },
    title:        { type: String, required: true },
    message:      { type: String, required: true },
    type:         { type: String, required: true },
    referenceId:  { type: String },
    isRead:       { type: Boolean, default: false }
  }, { timestamps: true });
  
  module.exports = mongoose.model('Notification', NotificationSchema);
  