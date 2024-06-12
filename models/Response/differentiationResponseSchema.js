const mongoose = require('mongoose');

const differentiationResponseSchema = new mongoose.Schema({
  differentiationTitle: { type: String, default: '' },
  differentiationGPT: { type: String, default: '' },
  differentiationGPTCleaned: { type: String, default: '' },
  differentiationGPT1: { type: String, default: '' },
  differentiationGPT2: { type: String, default: '' },
  differentiationGPT3: { type: String, default: '' },
  differentiationGPT4: { type: String, default: '' },
  differentiationGPT5: { type: String, default: '' },
  differentiationGPT6: { type: String, default: '' },
  differentiationHeader1: { type: String, default: '' },
  differentiationHeader2: { type: String, default: '' },
  differentiationHeader3: { type: String, default: '' },
  differentiationHeader4: { type: String, default: '' },
  differentiationHeader5: { type: String, default: '' },
  differentiationHeader6: { type: String, default: '' },
  differentiation1: { type: String, default: '' },
  differentiation2: { type: String, default: '' },
  differentiation3: { type: String, default: '' },
  differentiation4: { type: String, default: '' },
  differentiation5: { type: String, default: '' },
  differentiation6: { type: String, default: '' },
  competitionIcon1: { type: String, default: '' },
  competitionIcon2: { type: String, default: '' },
  competitionIcon3: { type: String, default: '' },
  competitionIcon4: { type: String, default: '' },
  competitionIcon5: { type: String, default: '' },
  competitionIcon6: { type: String, default: '' }
});

module.exports = differentiationResponseSchema;
