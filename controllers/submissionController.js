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
    const url = `${sectionToUrlMap[section]}?userID=${formResponses.userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;

    let submission = await Submission.findOne({ "user.submissionId": formId });
    if (!submission) {
      submission = new Submission({
        user: { userId: formResponses.userId, submissionId: formId },
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

    await fetch(url, { method: "GET" });
  } catch (error) {
    console.error("Error processing submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.postShortFormSubmission = async (req, res) => {
  try {
    const { formId, formResponses, generatedPresentationId, section } = req.body;
    const urlsToTrigger = [sectionToUrlMap1[section]];

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
    console.error("Error processing short form submission:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
