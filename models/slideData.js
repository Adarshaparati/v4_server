const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  SessionID: String,
  UserID: String,
  FormID: String,
  PresentationID: String,
  BackupSlideIndex: Number,
  GenSlideID: String,
  SectionStartTime: String, // Add SectionStartTime
  sectionEndTime: String,
  SectionName: String, // Add SectionName
});

module.exports = mongoose.model('slide_display', DataSchema);
