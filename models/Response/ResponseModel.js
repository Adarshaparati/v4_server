const mongoose = require('mongoose');
const aboutSchema = require('./aboutResponseSchema')
const userSchema = require('./userResponseSchema');
const problemDescriptionSchema = require('./problemResponseSchema');
const solutionDescriptionSchema = require('./solutionResponseSchema');
const marketSchema = require('./marketResponseSchema');
const productSchema = require('./productResponseSchema');
const productScreenSchema = require('./productScreenResponseSchema');
const businessModelSchema = require('./businessModelResponseSechema');
const goToMarketSchema = require('./gtmResponseSchema');
const trackRecordSchema = require('./trackRecordResponseSchema');
const caseStudySchema = require('./caseStudyResponse');
const testimonialSchema = require('./testimonialResponseSchema');
const competitorSchema = require('./competitorsResponseSchema');
const competitiveDiffSchema = require('./differentiationResponseSchema');
const teamMemberSchema = require('./teamResponseSchema');
const contactInfoSchema = require('./contactInfoResponseSchema');
const financialInfoSchema = require('./financialsnapshotResponseSchema');
const mobileAppScreenshotsResponseSchema  = require('./mobileAppScreenshotsResponseSchema')
const webAppScreenshotsResponseSchema = require('./webAppScreenshotsResponseSchema')
const ResponseSchema = new mongoose.Schema({
    user: userSchema,
    about: aboutSchema,
    problemDescription: problemDescriptionSchema,
    solutionDescription: solutionDescriptionSchema,
    market: marketSchema, 
    product: productSchema,
    productScreen: productScreenSchema,
    mobileAppScreenshots:mobileAppScreenshotsResponseSchema,
    webAppScreenshots:webAppScreenshotsResponseSchema,
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

const Response = mongoose.model('Response', ResponseSchema,'Db_Gpt');

module.exports = Response;
