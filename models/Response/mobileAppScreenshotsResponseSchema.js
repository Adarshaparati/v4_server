

const mongoose = require('mongoose');

const mobileAppScreenshotsResponseSchema = new mongoose.Schema({
  mobileScreenshotsDescription: { type: String, default: '' },
  mobileScreenshot1: { type: String, default: '' },
  mobileScreenshot2: { type: String, default: '' },
  mobileScreenshot3: { type: String, default: '' },
});

module.exports = mobileAppScreenshotsResponseSchema;