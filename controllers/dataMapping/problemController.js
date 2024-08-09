const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')
async function processProblemSection(submission, prompts) {
    const {problemPrompts} = prompts
    const { companyDetails } = submission;
    const { companyOverview } = companyDetails;

    const problemTitle = await GPT(problemPrompts.problemTitle.prompt, companyOverview);
    const problemGPT = await NestedGPT(
        problemPrompts.problemGPT.prompt,
        problemPrompts.problemGPT.Refine,
        companyOverview
    );
    const problemStatement = await GPT(problemPrompts.problemStatement.prompt, problemGPT);
    const problemPoints = cleanAndSplit(problemGPT);

    const problemHeaderDescriptions = await Promise.all(
        problemPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(problemPrompts.problemPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        problemHeader1,
        problemHeader2,
        problemHeader3,
        problemHeader4,
        problemHeader5,
        problemHeader6
    ] = await Promise.all(
        problemHeaderDescriptions.map(item => item.header)
    );

    const problemResponse = {
        problemTitle:cleanHeader(problemTitle),
        problemStatement,
        problemGPT,
        problemGPTCleaned: "",
        problemGPT1: "",
        problemGPT2: "",
        problemGPT3: "",
        problemGPT4: "",
        problemGPT5: "",
        problemGPT6: "",
        problemHeader1: problemHeader1,
        problemHeader2: problemHeader2,
        problemHeader3: problemHeader3,
        problemHeader4: problemHeader4,
        problemHeader5: problemHeader5,
        problemHeader6: problemHeader6,
        problemDescription1: problemHeaderDescriptions[0]?.description || "",
        problemDescription2: problemHeaderDescriptions[1]?.description || "",
        problemDescription3: problemHeaderDescriptions[2]?.description || "",
        problemDescription4: problemHeaderDescriptions[3]?.description || "",
        problemDescription5: problemHeaderDescriptions[4]?.description || "",
        problemDescription6: problemHeaderDescriptions[5]?.description || "",
        problemIcon1: "",
        problemIcon2: "",
        problemIcon3: "",
        problemIcon4: "",
        problemIcon5: "",
        problemIcon6: ""
    };
    console.log("problem...");
    return problemResponse;
}

module.exports = processProblemSection;
