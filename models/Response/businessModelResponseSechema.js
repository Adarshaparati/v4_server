const mongoose = require('mongoose');

const businessModelResponseSechema = new mongoose.Schema({
  revenueModel: { type: String, default: '' },
  revenueModelImage: { type: String, default: '' },
  revenueStreamGPT: { type: String, default: '' },
  revenueStreamGPTCleaned: { type: String, default: '' },
  revenueStreamGPT1: { type: String, default: '' },
  revenueStreamGPT2: { type: String, default: '' },
  revenueStreamGPT3: { type: String, default: '' },
  revenueStreamGPT4: { type: String, default: '' },
  stream1: { type: String, default: '' },
  stream2: { type: String, default: '' },
  stream3: { type: String, default: '' },
  stream4: { type: String, default: '' },
  streamDescription1: { type: String, default: '' },
  streamDescription2: { type: String, default: '' },
  streamDescription3: { type: String, default: '' },
  streamDescription4: { type: String, default: '' },
  streamIcon1: { type: String, default: '' },
  streamIcon2: { type: String, default: '' },
  streamIcon3: { type: String, default: '' },
  streamIcon4: { type: String, default: '' }
});

module.exports = businessModelResponseSechema;
