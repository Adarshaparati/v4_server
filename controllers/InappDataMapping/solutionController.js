const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processSolutionSection(submission, prompts,response) {
    const {solutionPrompts} = prompts;
    const {solutionDescription} = submission;
    
    const solutionStatement = await GPT(solutionPrompts.solutionStatement.prompt,`User Response: ${solutionDescription.solutionsDescription} Existing Response: ${response.solutionDescription.solutionStatement}`);
    const solutionGPT = await GPT(solutionPrompts.solutionGPT.prompt,`User Response: ${solutionDescription.solutionsDescription} Existing Response: ${response.solutionDescription.solutionGPT}`);
    const solutionTitle = await GPT(solutionPrompts.solutionTitle.prompt, solutionStatement);

    const solutionPoints = cleanAndSplit(solutionGPT);

    const solutionHeaderDescriptions = await Promise.all(
        solutionPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(solutionPrompts.solutionPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        solutionHeader1,
        solutionHeader2,
        solutionHeader3,
        solutionHeader4,
        solutionHeader5,
        solutionHeader6
    ] = await Promise.all(
        solutionHeaderDescriptions.map(item => item.header)
    );

    const solutionResponse = {
        iterativeSolution: "",
        solutionTitle:cleanHeader(solutionTitle),
        solutionStatement,
        solutionGPT,
        solutionGPTCleaned: "",
        solutionGPT1: "",
        solutionGPT2: "",
        solutionGPT3: "",
        solutionGPT4: "",
        solutionGPT5: "",
        solutionGPT6: "",
        solutionHeader1: solutionHeader1,
        solutionHeader2: solutionHeader2,
        solutionHeader3: solutionHeader3,
        solutionHeader4: solutionHeader4,
        solutionHeader5: solutionHeader5,
        solutionHeader6: solutionHeader6,
        solutionDescription1: solutionHeaderDescriptions[0]?.description || "",
        solutionDescription2: solutionHeaderDescriptions[1]?.description || "",
        solutionDescription3: solutionHeaderDescriptions[2]?.description || "",
        solutionDescription4: solutionHeaderDescriptions[3]?.description || "",
        solutionDescription5: solutionHeaderDescriptions[4]?.description || "",
        solutionDescription6: solutionHeaderDescriptions[5]?.description || "",
        solutionIcon1: "",
        solutionIcon2: "",
        solutionIcon3: "",
        solutionIcon4: "",
        solutionIcon5: "",
        solutionIcon6: ""
    };
    console.log("solution...");
    return solutionResponse;
}

module.exports = processSolutionSection;
