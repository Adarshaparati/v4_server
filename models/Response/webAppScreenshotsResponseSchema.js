const mongoose = require('mongoose');

const webAppScreenshotsResponseSchema = new mongoose.Schema({
  webScreenshotsDescription: { type: String, default: '' },
  webScreenshot1: { type: String, default: '' },
  webScreenshot2: { type: String, default: '' },
  webScreenshot3: { type: String, default: '' }
});

module.exports = webAppScreenshotsResponseSchema;