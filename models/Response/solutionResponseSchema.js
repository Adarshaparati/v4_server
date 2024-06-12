const mongoose = require('mongoose');

const solutionResponseSchema = new mongoose.Schema({
  iterativeSolution: { type: String, default: '' },
  solutionTitle: { type: String, default: '' },
  solutionStatement: { type: String, default: '' },
  solutionGPT: { type: String, default: '' },
  solutionGPTCleaned: { type: String, default: '' },
  solutionGPT1: { type: String, default: '' },
  solutionGPT2: { type: String, default: '' },
  solutionGPT3: { type: String, default: '' },
  solutionGPT4: { type: String, default: '' },
  solutionGPT5: { type: String, default: '' },
  solutionGPT6: { type: String, default: '' },
  solutionHeader1: { type: String, default: '' },
  solutionHeader2: { type: String, default: '' },
  solutionHeader3: { type: String, default: '' },
  solutionHeader4: { type: String, default: '' },
  solutionHeader5: { type: String, default: '' },
  solutionHeader6: { type: String, default: '' },
  solutionDescription1: { type: String, default: '' },
  solutionDescription2: { type: String, default: '' },
  solutionDescription3: { type: String, default: '' },
  solutionDescription4: { type: String, default: '' },
  solutionDescription5: { type: String, default: '' },
  solutionDescription6: { type: String, default: '' },
  solutionIcon1: { type: String, default: '' },
  solutionIcon2: { type: String, default: '' },
  solutionIcon3: { type: String, default: '' },
  solutionIcon4: { type: String, default: '' },
  solutionIcon5: { type: String, default: '' },
  solutionIcon6: { type: String, default: '' }
});

module.exports = solutionResponseSchema;
