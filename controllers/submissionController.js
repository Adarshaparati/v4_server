const aboutSchema = require("../models/Submission/aboutModel");
const companyDetailsSchema = require("../models/Submission/companyDetailsModel");
const problemDescriptionSchema = require("../models/Submission/problemDescriptionModel");
const solutionDescriptionSchema = require("../models/Submission/solutionDescriptionModel");
const marketSchema = require("../models/Submission/marketModel");
const productSchema = require("../models/Submission/productModel");
const productScreenSchema = require("../models/Submission/productScreenModel");
const businessModelSchema = require("../models/Submission/businessModel");
const goToMarketSchema = require("../models/Submission/goToMarketModel");
const trackRecordSchema = require("../models/Submission/trackRecordModel");
const caseStudySchema = require("../models/Submission/caseStudyModel");
const testimonialSchema = require("../models/Submission/testimonialModel");
const competitorSchema = require("../models/Submission/competitorModel");
const competitiveDiffSchema = require("../models/Submission/competitiveDiffModel");
const teamMemberSchema = require("../models/Submission/teamMemberModel");
const contactInfoSchema = require("../models/Submission/contactInfoModel");
const financialInfoSchema = require("../models/Submission/financialInfoModel");

const mongoose = require("mongoose");
const Response = require("../models/Response/ResponseModel");

const aboutResponseSchema = require("../models/Response/aboutResponseSchema");
const problemDescriptionResponseSchema = require("../models/Response/problemResponseSchema");
const solutionDescriptionResponseSchema = require("../models/Response/solutionResponseSchema");
const marketResponseSchema = require("../models/Response/marketResponseSchema");
const productResponseSchema = require("../models/Response/productResponseSchema");
const productScreenResponseSchema = require("../models/Response/productScreenResponseSchema");
const businessModelResponseSchema = require("../models/Response/businessModelResponseSechema");
const goToMarketResponseSchema = require("../models/Response/gtmResponseSchema");
const trackRecordResponseSchema = require("../models/Response/trackRecordResponseSchema");
const caseStudyResponseSchema = require("../models/Response/caseStudyResponse");
const testimonialResponseSchema = require("../models/Response/testimonialResponseSchema");
const competitorResponseSchema = require("../models/Response/competitorsResponseSchema");
const competitiveDiffResponseSchema = require("../models/Response/differentiationResponseSchema");
const teamMemberResponseSchema = require("../models/Response/teamResponseSchema");
const contactInfoResponseSchema = require("../models/Response/contactInfoResponseSchema");
const financialInfoResponseSchema = require("../models/Response/financialsnapshotResponseSchema");

const user = require("./dataMapping/user");
const processMapping = require("../utils/sectionToProcessMapping");

const Submission = require("../models/Submission/formModel");
const ShortForm = require("../models/Submission/shortFormModel");
const propertyToSchemaMap = require("../utils/propertyToSchemaMap");
const sectionToUrlMap = require("../utils/sectionToUrlMapping");
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const additionalUrlsMap = require("../utils/additionalSectionToUrlMapping");
const {
  authorize,
  storeUserResponses,
  updateMatchedRow,
  findLatestFormIDByEmail,
} = require("../services/spreadsheet");

exports.getSubmissionID = async (req, res) => {
  try {
    const userId = req.headers["x-userid"];
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    const submissionID = await findLatestFormIDByEmail(auth, userId);
    res.json({ submissionID: submissionID || null });
  } catch (error) {
    console.error("Error fetching submission ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postUpdateRow = async (req, res) => {
  const { userID, formID, newColumnValue } = req.body;
  if (!userID || !formID || !newColumnValue) {
    return res.status(400).json({ error: "Missing required parameters" });
  }
  try {
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    await updateMatchedRow(auth, userID, formID, newColumnValue);
    res.json({ message: "Row updated successfully" });
  } catch (error) {
    console.error("Error updating row:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postStoreResponse = async (req, res) => {
  const { formId, formResponses } = req.body;
  if (!formId || !formResponses) {
    return res.status(400).json({ error: "Missing required parameters" });
  }

  const processedFormResponses = formResponses.map((response) =>
    Array.isArray(response) && response.length === 1 && response[0] === ""
      ? ""
      : response
  );

  try {
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    await storeUserResponses(auth, formId, processedFormResponses);
    res.json({ message: "Response stored successfully" });
  } catch (error) {
    console.error("Error storing response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//main form submission
exports.postSubmission = async (req, res) => {
  try {
    const { formId, formResponses, generatedPresentationId, section } =
      req.body;
    let url =
      sectionToUrlMap[section] +
      `?userID=${formResponses.userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;

    let submission = await Submission.findOne({ "user.submissionId": formId });
    if (!submission) {
      submission = new Submission({
        user: { userId: formResponses.userId, submissionId: formId },
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
    }
    for (const property of Object.keys(formResponses)) {
      const schemaKey = propertyToSchemaMap[property];
      if (schemaKey && submission[schemaKey]) {
        submission[schemaKey][property] = formResponses[property] || "";
      }
    }
    await submission.save();
    res.status(200).json({ message: "Data updated successfully" });

    await fetch(url, { method: "GET" })
      .then(() => console.log("url triggered"))
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
exports.postShortFormSubmission = async (req, res) => {
  try {
    const { formId, formResponses, generatedPresentationId, section } = req.body;
    let urlsToTrigger = new Set();

    // Function to check if a section is included in additionalUrlsMap
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

    let submission = await ShortForm.findOne({ "user.submissionId": formId });
    if (!submission) {
      submission = new ShortForm({
        user: { userId: formResponses.userId, submissionId: formId },
        // Add the rest of the fields based on the schemas
        about: {},
        companyDetails: {},
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

    for (const property of Object.keys(formResponses)) {
      const schemaKey = propertyToSchemaMap[property];
      if (schemaKey && submission[schemaKey]) {
        submission[schemaKey][property] = formResponses[property] || "";
      }
    }

    res.status(200).json({ message: "Data updated successfully" });

    const db = mongoose.connection.db;
    const collection = db.collection("Prompts");
    const prompts = await collection.findOne({});

    if (!prompts) {
      return res.status(404).send({ error: "Prompts not found" });
    }

    let response = await Response.findOne({ "user.submissionId": formId });
    if (!response) {
      response = new Response({
        user: { userId: formResponses.userId, submissionId: formId },
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

    if (section === "companyDetails") {
      const [about, problemDescription, solutionDescription, competitors] = await Promise.all([
        processMapping["about"](submission, prompts),
        processMapping["problemDescription"](submission, prompts),
        processMapping["solutionDescription"](submission, prompts),
        processMapping["competitors"](submission, prompts),
      ]);

      response["about"] = about;
      response["problemDescription"] = problemDescription;
      response["solutionDescription"] = solutionDescription;
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

    const data = await response.save();
    let fetchPromises;
    if (data) {
      if (additionalUrlsMap[section]) {
        // Ensure sectionToUrlMap1.about is added first when companyDetails is processed
        if (section === "companyDetails") {
          urlsToTrigger.add(sectionToUrlMap1.about);
        }

        additionalUrlsMap[section].forEach(url => urlsToTrigger.add(url));
      }

      const queryParams = `?userID=${formResponses.userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;
      fetchPromises = Array.from(urlsToTrigger).map(url =>
        fetch(`${url}${queryParams}`, { method: "GET" })
          .then(() => console.log(`${section} URL triggered: ${url}`))
          .catch(error =>
            console.error(`Error triggering URL: ${url}`, error)
          )
      );
      
    }
    await submission.save();
    
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
