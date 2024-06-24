const {fetchPresentationURLfromsubmissionID, fetchSlideIDsfromsubmissionID, fetchPresentationURL, getSheetIdFromUrl } = require("../services/spreadsheet");
const {authorize} = require('../services/auth')
exports.getSlidesURL = async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const url = await fetchPresentationURLfromsubmissionID(auth, formId);
    res.json(url);
  } catch (error) {
    console.error("Error fetching slides URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSlideIDs = async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const SlidesIDs = await fetchSlideIDsfromsubmissionID(auth, formId);
    res.json(SlidesIDs);
  } catch (error) {
    console.error("Error fetching slide IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSlides = async (req, res) => {
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
};

exports.getSlides_pageIDs=async(req,res) =>{
  
}
