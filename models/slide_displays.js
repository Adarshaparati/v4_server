const mongoose = require('mongoose');

const slideDisplaySchema = new mongoose.Schema({
  SessionID: String,
  UserID: String,
  FormID: String,
  PresentationID: String,
  SectionStartTime: String,
  SectionName: String,
  BackupSlideIndex: Number,
  GenSlideID: String,
  sectionEndTime: String
});

module.exports = mongoose.model('slide_displays', slideDisplaySchema);