const mongoose = require('mongoose');

const trackRecordResponseSchema = new mongoose.Schema({
  trackRecordTitle: { type: String, default: '' },
  phaseTimeline1: { type: String, default: '' },
  phaseTimeline2: { type: String, default: '' },
  phaseTimeline3: { type: String, default: '' },
  tractionPhaseHeader1: { type: String, default: '' },
  tractionPhaseHeader2: { type: String, default: '' },
  tractionPhaseHeader3: { type: String, default: '' },
  tractionPhaseDescription1: { type: String, default: '' },
  tractionPhaseDescription2: { type: String, default: '' },
  tractionPhaseDescription3: { type: String, default: '' }
});

module.exports = trackRecordResponseSchema;
