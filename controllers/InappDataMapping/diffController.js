const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function diffController(submission,prompts,response){
    const {differentiationPrompts} = prompts;
    const {about,competitiveDiff} = submission;

    const differentiationGPT = await GPT(differentiationPrompts.differentiationGPT.prompt,`User Response:${competitiveDiff.competitiveDiff} Existing Response: ${response.competitiveDiff.differentiationGPT}`)
    const differentiationTitle = await GPT(differentiationPrompts.differentiationTitle.prompt,`User Response: [company name:${about.companyName} Differntiation: ${differentiationGPT}] Existing Response: ${response.competitiveDiff.differentiationTitle} `)
    
    const differentiationPoints = cleanAndSplit(differentiationGPT);
    const differentiationHeaderDescriptions = await Promise.all(
        differentiationPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(differentiationPrompts.differentiationPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const diffResponse ={
        differentiationTitle: cleanHeader(differentiationTitle),
        differentiationGPT: differentiationGPT,
        differentiationGPTCleaned: "",
        differentiationGPT1: "",
        differentiationGPT2: "",
        differentiationGPT3: "",
        differentiationGPT4: "",
        differentiationGPT5: "",
        differentiationGPT6: "",
        differentiationHeader1: differentiationHeaderDescriptions[0]?.header || "",
        differentiationHeader2: differentiationHeaderDescriptions[1]?.header || "",
        differentiationHeader3: differentiationHeaderDescriptions[2]?.header || "",
        differentiationHeader4: differentiationHeaderDescriptions[3]?.header || "",
        differentiationHeader5: differentiationHeaderDescriptions[4]?.header || "",
        differentiationHeader6: differentiationHeaderDescriptions[5]?.header || "",
        differentiation1: differentiationHeaderDescriptions[0]?.description || "",
        differentiation2: differentiationHeaderDescriptions[1]?.description || "",
        differentiation3: differentiationHeaderDescriptions[2]?.description || "",
        differentiation4: differentiationHeaderDescriptions[3]?.description || "",
        differentiation5: differentiationHeaderDescriptions[4]?.description || "",
        differentiation6: differentiationHeaderDescriptions[5]?.description || "",
        competitionIcon1: "",
        competitionIcon2: "",
        competitionIcon3: "",
        competitionIcon4: "",
        competitionIcon5: "",
        competitionIcon6: ""

    }
    console.log('competition diff..')
    return diffResponse;

}

module.exports = diffController