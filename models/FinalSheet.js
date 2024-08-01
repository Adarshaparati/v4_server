const mongoose = require('mongoose');

const finalSheetSchema = new mongoose.Schema({
  UserID: { type: String, required: true },
  FormID: { type: String, required: true },
  PresentationURL: { type: String, required: true },
  pptName: { type: String, required: true },
  currentTime: { type: Date, default: Date.now },
  paymentStatus: { type: Number, required: true }
});

module.exports = mongoose.model('final_sheets', finalSheetSchema);
