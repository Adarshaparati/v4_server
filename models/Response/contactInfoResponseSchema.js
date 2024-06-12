const mongoose = require('mongoose');

const contactInfoResponseSchema = new mongoose.Schema({
  contactEmail: { type: String, default: '' },
  contactPhone: { type: String, default: '' },
  contactWebsite: { type: String, default: '' },
  companyLinkedin: { type: String, default: '' },
  contactUsCoverImage: { type: String, default: '' }
});

module.exports = contactInfoResponseSchema;
