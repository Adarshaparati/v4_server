const mongoose = require('mongoose');

const marketResponseSchema = new mongoose.Schema({
  industry: { type: String, default: '' },
  marketTitleGPT: { type: String, default: '' },
  marketTitle: { type: String, default: '' },
  marketDescription: { type: String, default: '' },
  industryCompetitiveness: { type: String, default: '' },
  TAM: { type: Number, default: 1000 },
  TAMDescription: { type: String, default: '' },
  SAM: { type: Number, default: 500 },
  SAMDescription: { type: String, default: '' },
  SOM: { type: Number, default: 50 },
  SOMDescription: { type: String, default: '' },
  growthDriverGPT: { type: String, default: '' },
  growthDriverGPTCleaned: { type: String, default: '' },
  growthDriverGPT1: { type: String, default: '' },
  growthDriverGPT2: { type: String, default: '' },
  growthDriverGPT3: { type: String, default: '' },
  growthDriverGPT4: { type: String, default: '' },
  growthDriverGPT5: { type: String, default: '' },
  growthDriver1: { type: String, default: '' },
  growthDriver2: { type: String, default: '' },
  growthDriver3: { type: String, default: '' },
  growthDriver4: { type: String, default: '' },
  growthDriver5: { type: String, default: '' },
  year1: { type: String, default: '' },
  year2: { type: String, default: '' },
  TAMGrowthRate: { type: String, default: '' },
  TAMFuture: { type: String, default: '' },
  SAMGrowthRate: { type: String, default: '' },
  SAMFuture: { type: String, default: '' }
});

module.exports = marketResponseSchema;
