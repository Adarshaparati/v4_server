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

const propertyToSchemaMap = require("../utils/propertyToSchemaMap");
const sectionToUrlMap = require("../utils/sectionToUrlMapping");
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const additionalUrlsMap = require("../utils/additionalSectionToUrlMapping");
const user = require('./dataMapping/user');
const processMapping = require('../utils/sectionToProcessMapping') 


exports.postFetchAndProcess = async (req, res) => {
  try {
    const { formId, submission,generatedPresentationId, section } = req.body;

    if (!submission || typeof submission !== 'object' || !submission.user || !submission.user.userId || !submission.user.submissionId) {
      return res.status(400).json({ error: "Invalid or missing submission in query parameters." });
    }

    let urlsToTrigger = new Set();


    const isIncludedInAdditionalUrlsMap = (section) => {
      for (let key in additionalUrlsMap) {
        if (additionalUrlsMap[key].includes(sectionToUrlMap1[section])) {
          return true;
        }
      }
      return false;
    };

    // Add the URL to the set only if it's not included in additionalUrlsMap
    if (!isIncludedInAdditionalUrlsMap(section)) {
      urlsToTrigger.add(sectionToUrlMap1[section]);
    }

    // Get prompts from MongoDB
    const db = mongoose.connection.db;
    const collection = db.collection("Prompts");
    const prompts = await collection.findOne({});
    if (!prompts) {
      return res.status(404).send({ error: "Prompts not found" });
    }

    // Find or create response object
    let response = await Response.findOne({ "user.submissionId": submission.user.submissionId });
    if (!response) {
      response = new Response({
        user: { userId: submission.user.userId, submissionId: submission.user.submissionId },
        about: {},
        problemDescription: {},
        solutionDescription: {},
        market: {},
        product: {},
        productScreen: {},
        businessModel: {},
        goToMarket: {},
        trackRecord: {},
        caseStudies: {},
        testimonials: {},
        competitors: {},
        competitiveDiff: {},
        teamMembers: {},
        contactInfo: {},
        financialInfo: {},
      });
    }

    // Process sections
    if (section === "companyDetails") {
      const [about, problemDescription, caseStudies, competitors] = await Promise.all([
        processMapping["about"](submission, prompts),
        processMapping["problemDescription"](submission, prompts),
        processMapping["caseStudies"](submission, prompts),
        processMapping["competitors"](submission, prompts)
      ]);

      const solutionDescription = await processMapping["solutionDescription"](problemDescription, prompts);
      response["about"] = about;
      response["problemDescription"] = problemDescription;
      response["solutionDescription"] = solutionDescription;
      response["caseStudies"] = caseStudies;
      response["competitors"] = competitors;
    } else if (section === "market") {
      response["market"] = await processMapping["market"](submission, prompts);
    } else if (section === "product") {
      const [product, goToMarket, businessModel, competitiveDiff] = await Promise.all([
        processMapping["product"](submission, prompts),
        processMapping["goToMarket"](submission, prompts),
        processMapping["businessModel"](submission, prompts),
        processMapping["competitiveDiff"](submission, prompts),
      ]);

      response["product"] = product;
      response["goToMarket"] = goToMarket;
      response["businessModel"] = businessModel;
      response["competitiveDiff"] = competitiveDiff;
    } else if (section === "contactInfo") {
      response["contactInfo"] = await processMapping["contactInfo"](submission, prompts);
    }

    // Save response to DB
    const data = await response.save();

    // Handle URL triggering
    if (data) {
      if (additionalUrlsMap[section]) {
        if (section === "companyDetails") {
          urlsToTrigger.add(sectionToUrlMap1.about);
        }

        additionalUrlsMap[section].forEach((url) => urlsToTrigger.add(url));
      }

      const queryParams = `?userID=${submission.user.userId}&submissionID=${submission.user.submissionId}&generatedPresentationID=${generatedPresentationId}`;
      const fetchPromises = Array.from(urlsToTrigger).map((url) =>
        fetch(`${url}${queryParams}`, { method: "GET" })
          .then(() => console.log(`${section} URL triggered: ${url}`))
          .catch((error) => console.error(`Error triggering URL: ${url}`, error))
      );
      await Promise.all(fetchPromises);
    }

    res.status(200).json({ message: "Data updated successfully" });

  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

