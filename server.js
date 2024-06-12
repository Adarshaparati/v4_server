// File: index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importing controllers and other modules
const aboutController = require('./controllers/aboutController');
const problemController = require('./controllers/problemController');
const solutionController = require('./controllers/solutionController');
const productScreenShotController = require('./controllers/productScreenShotController');
const productController = require('./controllers/productController');
const businessModelController = require('./controllers/businessModelController');
const gtmController = require('./controllers/gtmController');
const competitorsController = require('./controllers/competitorsController');
const marketController = require('./controllers/marketController');
const contactController = require('./controllers/contactController');

const getColors = require('./services/colors');
const {
  authorize,
  getSlides,
  findLatestFormIDByEmail,
  getSheetIdFromUrl,
  fetchPresentationURL,
  fetchPresentationHistory,
  updateMatchedRow,
  fetchPresentationURLfromsubmissionID,
  fetchSlideIDsfromsubmissionID,
  storeUserResponses,
} = require("./services/spreadsheet");

const propertyToSchemaMap = require("./utils/propertyToSchemaMap");
const sectionToUrlMap = require("./utils/sectionToUrlMapping");
const sectionToUrlMap1 = require("./utils/sectionToUrlMapping1");
const additionalUrlsMap = require("./utils/additionalSectionToUrlMapping");

const User = require("./models/Submission/users");
const Submission = require("./models/Submission/formModel");
const ShortForm = require("./models/Submission/shortFormModel");
const Response = require('./models/Response/ResponseModel');

const app = express();
app.use(bodyParser.json());

// MongoDB Connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// connectToDatabase();

// Routes
app.get("/test", (req, res) => {
  console.log("API hit");
  res.json("API hit");
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    console.error("Error fetching user data:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.post("/user", async (req, res) => {
  const userData = req.body.user;
  if (!userData) {
    return res.status(400).json({ error: "User data is required" });
  }

  try {
    let user = await User.findOne({ email: userData.email });

    if (user) {
      user.latestLogin = new Date();
      await user.save();
      console.log("User login updated:", user);
      res.status(200).json({ message: "User login updated successfully" });
    } else {
      user = await User.create(userData);
      console.log("User created:", user);
      res.status(201).json({ message: "User created successfully", userId: user._id });
    }
  } catch (err) {
    console.error("Error creating or updating user:", err);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});

app.get("/history", async (req, res) => {
  const userId = req.headers["x-userid"];
  try {
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const history = await fetchPresentationHistory(auth, userId);
    const jsonData = history.map((row) => ({
      userID: row[0],
      submissionID: row[1],
      link: getSheetIdFromUrl(row[2]),
      PPTName: row[3],
      Date: row[4],
    }));
    res.json(jsonData);
  } catch (e) {
    console.error("Error fetching history:", e);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/slidesURL", async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const url = await fetchPresentationURLfromsubmissionID(auth, formId);
    res.json(url);
  } catch (error) {
    console.error("Error fetching slides URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/slideIDs", async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const SlidesIDs = await fetchSlideIDsfromsubmissionID(auth, formId);
    res.json(SlidesIDs);
  } catch (error) {
    console.error("Error fetching slide IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/slides", async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const url = await fetchPresentationURL(auth, formId);
    const id = await getSheetIdFromUrl(url);
    const SlidesIDs = await fetchSlideIDsfromsubmissionID(auth, formId);
    res.json({ id, data: SlidesIDs });
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/submissionID", async (req, res) => {
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
});

app.post("/updateRow", async (req, res) => {
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
});

app.post("/storeresponse", async (req, res) => {
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
});

app.post("/submission", async (req, res) => {
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
});

app.post("/shortFormSubmission", async (req, res) => {
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
});

app.post('/get-colors', async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const colors = await getColors(imageUrl);
    res.json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post('/fetch-and-process', async (req, res) => {
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

      const gptResponse = new Response({
        about,
        problemDescription,
        solutionDescription,
        product,
        productScreen,
        businessModel: businessModelResult,
        goToMarket: gtm,
        competitors,
        market: marketControllerResult,
        contactInfo: contactController(submission),
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
});

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

module.exports = { connectToDatabase, app };
