
const sectionToUrlMap1 = require("../utils/sectionToUrlMapping1");
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