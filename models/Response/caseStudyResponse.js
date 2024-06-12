const mongoose = require('mongoose');

const caseStudyResponseSchema = new mongoose.Schema({
  caseStudyTitle: { type: String, default: '' },
  caseStudy: { type: String, default: '' },
  challenges: { type: String, default: '' },
  solution: { type: String, default: '' },
  outcome: { type: String, default: '' },
  caseStudyCoverImage: { type: String, default: '' }
});

module.exports = caseStudyResponseSchema;
