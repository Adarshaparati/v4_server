const mongoose = require('mongoose');

const problemResponseSchema = new mongoose.Schema({
  problemTitle: { type: String, default: '' },
  problemStatement: { type: String, default: '' },
  problemGPT: { type: String, default: '' },
  problemGPTCleaned: { type: String, default: '' },
  problemGPT1: { type: String, default: '' },
  problemGPT2: { type: String, default: '' },
  problemGPT3: { type: String, default: '' },
  problemGPT4: { type: String, default: '' },
  problemGPT5: { type: String, default: '' },
  problemGPT6: { type: String, default: '' },
  problemHeader1: { type: String, default: '' },
  problemHeader2: { type: String, default: '' },
  problemHeader3: { type: String, default: '' },
  problemHeader4: { type: String, default: '' },
  problemHeader5: { type: String, default: '' },
  problemHeader6: { type: String, default: '' },
  problemDescription1: { type: String, default: '' },
  problemDescription2: { type: String, default: '' },
  problemDescription3: { type: String, default: '' },
  problemDescription4: { type: String, default: '' },
  problemDescription5: { type: String, default: '' },
  problemDescription6: { type: String, default: '' },
  problemIcon1: { type: String, default: '' },
  problemIcon2: { type: String, default: '' },
  problemIcon3: { type: String, default: '' },
  problemIcon4: { type: String, default: '' },
  problemIcon5: { type: String, default: '' },
  problemIcon6: { type: String, default: '' }
});

module.exports = problemResponseSchema
