const mongoose = require('mongoose');
const Submission = require("../models/Submission/formModel");
const Response = require('../models/Response/ResponseModel');

const user = require('./dataMapping/user')
const aboutController = require('./dataMapping/aboutController');
const problemController = require('./dataMapping/problemController');
const solutionController = require('./dataMapping/solutionController');
const productScreenShotController = require('./dataMapping/productScreenShotController');
const productController = require('./dataMapping/productController');
const businessModelController = require('./dataMapping/businessModelController');
const gtmController = require('./dataMapping/gtmController');
const trackRecordProcess = require('./dataMapping/trackRecordProcess')
const competitorsController = require('./dataMapping/competitorsController');
const marketController = require('./dataMapping/marketController');
const contactProcess = require('./dataMapping/contactController');
const caseStudiesProcess = require('./dataMapping/caseStudyProcess');
const testimonialProcess = require('./dataMapping/testimonialProcess');
const competitiveDiff = require('./dataMapping/diffController')
const financialInfoProcess = require('./dataMapping/testimonialProcess')
const teamProcess = require('./dataMapping/teamProcess')

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

    try {
      const [
        about,
        problemDescription,
        solutionDescription,
        product,
        productScreen,
        businessModelResult,
        gtm,
        competitors
      ] = await Promise.all([
        aboutController(submission, prompts.aboutPrompts),
        problemController(submission, prompts.problemPrompts),
        solutionController(submission, prompts.solutionPrompts),
        productController(submission, prompts.productPrompts),
        productScreenShotController(submission, prompts.productScreenShotPrompts),
        businessModelController(submission, prompts.businessModel),
        gtmController(submission, prompts.gtmPrompts),
        competitorsController(submission, prompts.competitorsPrompts)
      ]);

      const marketControllerResult = await marketController(submission, prompts.marketPrompts);
      console.log(user(submission))
      const gptResponse = new Response({
        user:user(submission),
        about,
        problemDescription,
        solutionDescription,
        market: marketControllerResult,
        product,
        productScreen,
        businessModel: businessModelResult,
        goToMarket: gtm,
        trackRecord:trackRecordProcess(submission),
        caseStudies: caseStudiesProcess(submission),
        testimonials: testimonialProcess(submission),
        competitors,
        competitiveDiff: competitiveDiff(submission),
        teamMembers: teamProcess(submission), 
        contactInfo: contactProcess(submission),
        financialInfo: financialInfoProcess(submission),
      });

      await gptResponse.save();
      res.json(gptResponse);
    } catch (error) {
      console.error('Error creating GPT response:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
