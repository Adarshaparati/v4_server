const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
  UserID: String,
  FormID: String,
  PresentationID: String,
  BackupSlideIndex: Number,
  GenSlideID: String,
  SectionTime:String,
  Sectionname: String,
});

module.exports = mongoose.model('slide_display', DataSchema);
