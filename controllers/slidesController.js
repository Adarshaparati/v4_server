const {
  fetchPresentationURLfromsubmissionID,
  fetchSlideIDsfromsubmissionID,
  fetchPresentationURL,
  getSheetIdFromUrl,
  fetchSlideIDsbysection,
} = require("../services/spreadsheet");
const { authorize } = require("../services/auth");
const FinalSheet = require('../models/FinalSheet');
// this is for the download of the slides
exports.getSlidesURL = async (req, res) => {
  try {
    const { formId } = req.query;

    if (!formId) {
      return res.status(400).json({ error: 'formId is required' });
    }

    const finalSheet = await FinalSheet.findOne({ FormID: formId });

    if (!finalSheet) {
      return res.status(404).json({ error: 'No data found for the provided formId' });
    }

    res.json({
      UserID: finalSheet.UserID,
      FormID: finalSheet.FormID,
      PresentationURL: finalSheet.PresentationURL,
      pptName: finalSheet.pptName
    });
  } catch (error) {
    console.error('Error fetching slides URL:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



exports.getSlideIDs = async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    const SlideIDs = await fetchSlideIDsfromsubmissionID(auth, formId);
    res.json(SlidesIDs);
  } catch (error) {
    console.error("Error fetching slide IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSlides = async (req, res) => {
  try {
    const formId = req.query.formId;
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    const url = await fetchPresentationURL(auth, formId);
    const id = await getSheetIdFromUrl(url);
    const SlidesIDs = await fetchSlideIDsfromsubmissionID(auth, formId);
    res.json({ id, data: SlidesIDs });
  } catch (error) {
    console.error("Error fetching slides:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSlideIDbySection = async (req, res) => {
  try {
    const formId = req.query.formId;
    const section = req.query.section;
    const auth = await authorize(
      [process.env.SHEET_SCOPES],
      process.env.SHEET_TOKEN_PATH
    );
    const SlideIDs = await fetchSlideIDsbysection(auth, formId, section);
    if(SlideIDs.length<1){res.json([]);}
    res.json(SlideIDs);
  } catch (error) {
    console.error("Error fetching slide IDs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
