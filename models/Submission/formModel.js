const mongoose = require('mongoose');
const aboutSchema = require('./aboutModel')
const userSchema = require('./userModel');
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
const mobileAppScreenshotsSchema = require('./mobileScreenshotSchema')
const webAppScreenshotsSchema = require('./webScreenshotSchema')

const submissionSchema = new mongoose.Schema({
    user: userSchema,
    about: aboutSchema,
    companyDetails: companyDetailsSchema,
    problemDescription: problemDescriptionSchema,
    solutionDescription: solutionDescriptionSchema,
    market: marketSchema, 
    product: productSchema,
    mobileAppScreenshots:mobileAppScreenshotsSchema,
    webAppScreenshots:webAppScreenshotsSchema,
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

const Submission = mongoose.model('Submission', submissionSchema);


module.exports = Submission;
