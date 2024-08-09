
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const Data = require('../models/Data'); // Import the Data model for MongoDB
const slide_data = require('../models/slideData'); // Import the slideData model for MongoDB
const SlideDisplay = require('../models/slide_displays');
exports.getTriggerAppscript =  async (req,res)=>{
    try{
        const {section,userId,formId,generatedPresentationId} = req.body
        console.log(section)
        url = sectionToUrlMap1[section];
      const queryParams = `?userID=${userId}&submissionID=${formId}&generatedPresentationID=${generatedPresentationId}`;
      console.log(`${url}${queryParams}`)
      fetch(`${url}${queryParams}`, { method: "GET" })
        .then(() => console.log(`${section} URL triggered: ${url}`))
        .catch((error) => console.error(`Error triggering URL: ${url}`, error));
    console.log("url triggered")
    res.json({"message":"URL triggered "})
    }catch{

    }
}
exports.storeDataInMongo = async (req, res) => {
  try {
      const { UserID, FormID, PresentationURL, pptName, currentTime } = req.body;

      const newData = new Data({
          UserID,
          FormID,
          PresentationURL,
          pptName,
          currentTime
      });

      const savedData = await newData.save();
      res.status(200).json(savedData);
  } catch (error) {
      console.error(error);
      res.status(500).json({ "message": "Internal server error" });
  }
}
exports.storeslideInMongo = async (req, res) => {
    try {
        const { SessionID, UserID, FormID, PresentationID, BackupSlideIndex, GenSlideID, SectionStartTime, SectionName, sectionEndTime } = req.body;

        let existingData = await slide_data.findOne({ SessionID });

        if (existingData) {
            if (UserID) existingData.UserID = UserID;
            if (FormID) existingData.FormID = FormID;
            if (PresentationID) existingData.PresentationID = PresentationID;
            if (BackupSlideIndex !== undefined) existingData.BackupSlideIndex = BackupSlideIndex;
            if (GenSlideID) existingData.GenSlideID = GenSlideID;
            if (SectionStartTime) existingData.SectionStartTime = SectionStartTime;
            if (sectionEndTime) existingData.sectionEndTime = sectionEndTime;
            if (SectionName) existingData.SectionName = SectionName;

            const updatedData = await existingData.save();
            return res.status(200).json(updatedData);
        } else {
            const newData = new slide_data({
                SessionID,
                UserID,
                FormID,
                PresentationID,
                BackupSlideIndex,
                GenSlideID,
                SectionStartTime,
                sectionEndTime,
                SectionName
            });

            const savedData = await newData.save();
            return res.status(200).json(savedData);
        }
    } catch (error) {
        console.error("Error caught during processing:", error);

        // Extract variables from req.body directly in the catch block
        const { SessionID, BackupSlideIndex, GenSlideID, sectionEndTime } = req.body;

        try {
            let existingData = await slide_data.findOne({ SessionID });

            if (existingData) {
                existingData.BackupSlideIndex = -1;
                existingData.GenSlideID = "error";
                existingData.sectionEndTime = "error";
                await existingData.save();
            } else {
                const newData = new slide_data({
                    SessionID,
                    UserID: req.body.UserID,
                    FormID: req.body.FormID,
                    PresentationID: req.body.PresentationID,
                    BackupSlideIndex: -1,
                    GenSlideID: "error",
                    SectionStartTime: req.body.SectionStartTime,
                    sectionEndTime: "error",
                    SectionName: req.body.SectionName,
                    error: {
                        message: error.message,
                        time: new Date()
                    }
                });
                await newData.save();
            }
        } catch (dbError) {
            console.error("Failed to store error information:", dbError);
        }

        res.status(500).json({ "message": "Internal server error" });
    }
};

exports.updatePaymentStatus = async (req, res) => {
    try {
      const { FormID, paymentStatus } = req.body;
  
      // Find the document by FormID and update the paymentStatus field
      const updatedData = await Data.findOneAndUpdate(
        { FormID },
        { paymentStatus },
        { new: true }
      );
  
      if (!updatedData) {
        return res.status(404).json({ message: "FormID not found" });
      }
  
      res.status(200).json(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  
// Fetch rows based on userID, formID, and presentationID
exports.getSlidesByParams = async (req, res) => {
    try {
      const {fid: formID, pid: presentationID } = req.params;
  
      const slides = await SlideDisplay.find({
        FormID: formID,
        PresentationID: presentationID
      });
  
      if (!slides || slides.length === 0) {
        return res.status(404).json({ message: 'No slides found for the given parameters.' });
      }
  
      res.status(200).json(slides);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching slides', error: error.message });
    }
  };