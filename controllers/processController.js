const mongoose = require('mongoose');
const Submission = require("../models/Submission/formModel");
const Response = require('../models/Response/ResponseModel');

const aboutSchema = require('../models/Response/aboutResponseSchema')
const problemDescriptionSchema = require('../models/Response/problemResponseSchema');
const solutionDescriptionSchema = require('../models/Response/solutionResponseSchema');
const marketSchema = require('../models/Response/marketResponseSchema');
const productSchema = require('../models/Response/productResponseSchema');
const productScreenSchema = require('../models/Response/productScreenResponseSchema');
const businessModelSchema = require('../models/Response/businessModelResponseSechema');
const goToMarketSchema = require('../models/Response/gtmResponseSchema');
const trackRecordSchema = require('../models/Response/trackRecordResponseSchema');
const caseStudySchema = require('../models/Response/caseStudyResponse');
const testimonialSchema = require('../models/Response/testimonialResponseSchema');
const competitorSchema = require('../models/Response/competitorsResponseSchema');
const competitiveDiffSchema = require('../models/Response/differentiationResponseSchema');
const teamMemberSchema = require('../models/Response/teamResponseSchema');
const contactInfoSchema = require('../models/Response/contactInfoResponseSchema');
const financialInfoSchema = require('../models/Response/financialsnapshotResponseSchema');

const user = require('./dataMapping/user');
const processMapping = require('../utils/sectionToProcessMapping') 


exports.postFetchAndProcess = async (req, res) => {
  const { filter, section } = req.body;
  if (!filter || !section) {
    return res.status(400).send({ error: 'Filter and section are required' });
  }

  try {
    const submission = await Submission.findOne(filter);
    if (!submission) {
      return res.status(404).send({ error: 'Submission not found' });
    }

    const sectionData = submission[section];
    if (!sectionData || sectionData.length === 0) {
      return res.status(400).send({ error: 'No valid data found for the specified section' });
    }

    const db = mongoose.connection.db;
    const collection = db.collection('Prompts');
    const prompts = await collection.findOne({});

    if (!prompts) {
      return res.status(404).send({ error: 'Prompts not found' });
    }

      let response = await Response.findOne(filter);
      if(!response){
      response = new Response({
        user:user(submission),
        about: aboutSchema,
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

      
    }
    else{
      response[section] = await processMapping[section](submission,prompts) 
    }
    await response.save();
    res.json(response);
    
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
