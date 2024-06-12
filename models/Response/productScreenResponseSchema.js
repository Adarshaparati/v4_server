const mongoose = require('mongoose');

const productScreenResponseSchema = new mongoose.Schema({
  mobileScreenshotsDescription: { type: String, default: '' },
  mobileScreenshot1: { type: String, default: '' },
  mobileScreenshot2: { type: String, default: '' },
  mobileScreenshot3: { type: String, default: '' },
  webScreenshotsDescription: { type: String, default: '' },
  webScreenshot1: { type: String, default: '' },
  webScreenshot2: { type: String, default: '' },
  webScreenshot3: { type: String, default: '' }
});

module.exports = productScreenResponseSchema;
