
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const Data = require('../models/Data'); // Import the Data model for MongoDB
const slide_data = require('../models/slideData'); // Import the slideData model for MongoDB
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
  
        // Check if the document with the given SessionID already exists
        let existingData = await slide_data.findOne({ SessionID });
  
        if (existingData) {
            // Update the existing document
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
            // Create a new document
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
        console.error(error);
        res.status(500).json({ "message": "Internal server error" });
    }
};