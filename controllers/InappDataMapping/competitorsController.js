const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const extractNumbers = require('../../utils/extractRatings')
async function processCompetitors(submission, prompts,response){
    const {competitorsPrompts} = prompts;
    const {about,competitors} = submission;
    const {companyName} = about;

   
    const companylist = competitors.competitors
    const companys = companylist.join(" ")
    const attributeGPT = await GPT(competitorsPrompts.attributeGPT.prompt,`User Response: ${companys} Existing Response: ${response.attributeGPT}`)
    const attributeList = cleanAndSplit(attributeGPT)

    const ratingsPromises = attributeList.map((attribute, index) =>
        GPT(competitorsPrompts.attributeRatings.prompt, `${attribute} Companies: ${companyName} ${companys}`)
            .then(response => extractNumbers(response))
    );

    const [
        attribute1Ratings,
        attribute2Ratings,
        attribute3Ratings,
        attribute4Ratings,
        attribute5Ratings
    ] = await Promise.all(ratingsPromises);

    const competitorsResponse ={
        company1: companyName,
        company2: companylist[0],
        company3: companylist[1],
        company4: companylist[2],
        company5: companylist[3],
        company6: companylist[4],
        company7: companylist[5],
        attributeGPT: "",
        attributeGPTCleaned: "",
        attributeGPT1: "",
        attributeGPT2: "",
        attributeGPT3: "",
        attributeGPT4: "",
        attributeGPT5: "",
        attribute1: attributeList[0],
        attribute2: attributeList[1],
        attribute3: attributeList[2],
        attribute4: attributeList[3],
        attribute5: attributeList[4],
        attribute1Ratings: attribute1Ratings,
        attribute2Ratings: attribute2Ratings,
        attribute3Ratings: attribute3Ratings,
        attribute4Ratings: attribute4Ratings,
        attribute5Ratings: attribute5Ratings,
        
        company1Attribute1: attribute1Ratings[0] || 3,
        company1Attribute2: attribute2Ratings[0] || 3,
        company1Attribute3: attribute3Ratings[0] || 3,
        company1Attribute4: attribute4Ratings[0] || 3,
        company1Attribute5: attribute5Ratings[0] || 3,

        company2Attribute1: attribute1Ratings[1] || 3,
        company2Attribute2: attribute2Ratings[1] || 3,
        company2Attribute3: attribute3Ratings[1] || 3,
        company2Attribute4: attribute4Ratings[1] || 3,
        company2Attribute5: attribute5Ratings[1] || 3,

        company3Attribute1: attribute1Ratings[2] || 3,
        company3Attribute2: attribute2Ratings[2] || 3,
        company3Attribute3: attribute3Ratings[2] || 3,
        company3Attribute4: attribute4Ratings[2] || 3,
        company3Attribute5: attribute5Ratings[2] || 3,

        company4Attribute1: attribute1Ratings[3] || 3,
        company4Attribute2: attribute2Ratings[3] || 3,
        company4Attribute3: attribute3Ratings[3] || 3,
        company4Attribute4: attribute4Ratings[3] || 3,
        company4Attribute5: attribute5Ratings[3] || 3,

        company5Attribute1: attribute1Ratings[4] || 3,
        company5Attribute2: attribute2Ratings[4] || 3,
        company5Attribute3: attribute3Ratings[4] || 3,
        company5Attribute4: attribute4Ratings[4] || 3,
        company5Attribute5: attribute5Ratings[4] || 3,

        company6Attribute1: attribute1Ratings[5] || 3,
        company6Attribute2: attribute2Ratings[5] || 3,
        company6Attribute3: attribute3Ratings[5] || 3,
        company6Attribute4: attribute4Ratings[5] || 3,
        company6Attribute5: attribute5Ratings[5] || 3,

        company7Attribute1: attribute1Ratings[6] || 3,
        company7Attribute2: attribute2Ratings[6] || 3,
        company7Attribute3: attribute3Ratings[6] || 3,
        company7Attribute4: attribute4Ratings[6] || 3,
        company7Attribute5: attribute5Ratings[6] || 3,
    }
    console.log("competition...");
    return competitorsResponse;
}

module.exports = processCompetitors