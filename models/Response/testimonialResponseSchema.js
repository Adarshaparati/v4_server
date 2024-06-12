const mongoose = require('mongoose');

const testimonialResponseSchema = new mongoose.Schema({
  testimonial1: { type: String, default: '' },
  testimonialName1: { type: String, default: '' },
  designation1: { type: String, default: '' },
  testimonial2: { type: String, default: '' },
  testimonialName2: { type: String, default: '' },
  designation2: { type: String, default: '' },
  testimonial3: { type: String, default: '' },
  testimonialName3: { type: String, default: '' },
  designation3: { type: String, default: '' },
  testimonial4: { type: String, default: '' },
  testimonialName4: { type: String, default: '' },
  designation4: { type: String, default: '' }
});

module.exports = testimonialResponseSchema;
