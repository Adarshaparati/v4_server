const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  UserID: String,
  FormID: String,
  PresentationURL: String,
  pptName: String,
  currentTime: String,
  paymentStatus: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('final_sheet', DataSchema);
