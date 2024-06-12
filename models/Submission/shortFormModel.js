const mongoose = require('mongoose');
const aboutSchema = require('./aboutModel');
const companyDetailsSchema = require('./companyDetailsModel');
const problemDescriptionSchema = require('./problemDescriptionModel');
const solutionDescriptionSchema = require('./solutionDescriptionModel');
const marketSchema = require('./marketModel');
const productSchema = require('./productModel');
const productScreenSchema = require('./productScreenModel');
const businessModelSchema = require('./businessModel');
const goToMarketSchema = require('./goToMarketModel');
const trackRecordSchema = require('./trackRecordModel');
const caseStudySchema = require('./caseStudyModel');
const testimonialSchema = require('./testimonialModel');
const competitorSchema = require('./competitorModel');
const competitiveDiffSchema = require('./competitiveDiffModel');
const teamMemberSchema = require('./teamMemberModel');
const contactInfoSchema = require('./contactInfoModel');
const financialInfoSchema = require('./financialInfoModel');

const shortFormSchema = new mongoose.Schema({
  user: {
    userId: String,
    submissionId: String,
  },
  about: aboutSchema,
  companyDetails: companyDetailsSchema,
  problemDescription: problemDescriptionSchema,
  solutionDescription: solutionDescriptionSchema,
  market: marketSchema,
  product: productSchema,
  productScreen: productScreenSchema,
  businessModel: businessModelSchema,
  goToMarket: goToMarketSchema,
  trackRecord: trackRecordSchema,
  caseStudies: caseStudySchema,
  testimonials: testimonialSchema,
  competitors: competitorSchema,
  competitiveDiff: competitiveDiffSchema,
  teamMembers: teamMemberSchema,
  contactInfo: contactInfoSchema,
  financialInfo: financialInfoSchema,
});

const ShortForm = mongoose.model('ShortForm', shortFormSchema);

module.exports = ShortForm;
