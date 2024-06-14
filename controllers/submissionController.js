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




const Submission = require("../models/Submission/formModel");
const ShortForm = require("../models/Submission/shortFormModel");
const propertyToSchemaMap = require("../utils/propertyToSchemaMap");
const sectionToUrlMap = require("../utils/sectionToUrlMapping");
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const additionalUrlsMap = require("../utils/additionalSectionToUrlMapping");
const { authorize, storeUserResponses, updateMatchedRow, findLatestFormIDByEmail } = require("../services/spreadsheet");

exports.getSubmissionID = async (req, res) => {
  try {
    const userId = req.headers["x-userid"];
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
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
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
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
    Array.isArray(response) && response.length === 1 && response[0] === "" ? "" : response
  );

  try {
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    await storeUserResponses(auth, formId, processedFormResponses);
    res.json({ message: "Response stored successfully" });
  } catch (error) {
    console.error("Error storing response:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postSubmission = async (req, res) => {
  try {
    const { formId, formResponses, generatedPresentationId, section } = req.body;
    let url = sectionToUrlMap[section] + `?userID=${formResponses.userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;

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
    const urlsToTrigger = [sectionToUrlMap1[section]];

    // Add additional URLs if any
    if (additionalUrlsMap[section]) {
      urlsToTrigger.push(...additionalUrlsMap[section]);
    }

    const queryParams = `?userID=${formResponses.userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;
    const fetchPromises = urlsToTrigger.map(url => 
      fetch(`${url}${queryParams}`, { method: "GET" })
        .then(() => console.log(`URL triggered: ${url}`))
        .catch(error => console.error(`Error triggering URL: ${url}`, error))
    );

    let submission = await ShortForm.findOne({ "user.submissionId": formId });
    if (!submission) {
      submission = new ShortForm({
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
        financialInfo: financialInfoSchema
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

    await Promise.all(fetchPromises);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
