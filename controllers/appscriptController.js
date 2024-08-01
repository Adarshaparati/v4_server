
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
const Data = require('../models/Data'); // Import the Data model for MongoDB
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