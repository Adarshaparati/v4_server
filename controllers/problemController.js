const { GPT, NestedGPT } = require('../services/gpt');
const cleanAndSplit = require('../utils/cleanandsplit');
const separateHeaderDescription = require('../utils/sepreateHeaderDescription');

async function problemController(submission, problemPrompts) {
    const { companyDetails } = submission;
    const { companyOverview } = companyDetails;

    const problemTitle = await GPT(problemPrompts.problemTitle.prompt, companyOverview);
    const problemStatement = await GPT(problemPrompts.problemStatement.prompt, companyOverview);
    const problemGPT = await NestedGPT(
        problemPrompts.problemGPT.prompt,
        problemPrompts.problemGPT.Refine,
        companyOverview
    );
    const problemPoints = cleanAndSplit(problemGPT);

    const problemHeaderDescriptions = await Promise.all(
        problemPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(problemPrompts.problemPointHeader.prompt, description);
            return { header: finalHeader, description };
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
        problemTitle,
        problemStatement,
        problemGPT,
        problemGPTCleaned: "test",
        problemGPT1: "test",
        problemGPT2: "test",
        problemGPT3: "test",
        problemGPT4: "test",
        problemGPT5: "test",
        problemGPT6: "test",
        problemHeader1: problemHeader1,
        problemHeader2: problemHeader2,
        problemHeader3: problemHeader3,
        problemHeader4: problemHeader4,
        problemHeader5: problemHeader5,
        problemHeader6: problemHeader6,
        problemDescription1: problemHeaderDescriptions[0]?.description || "test",
        problemDescription2: problemHeaderDescriptions[1]?.description || "test",
        problemDescription3: problemHeaderDescriptions[2]?.description || "test",
        problemDescription4: problemHeaderDescriptions[3]?.description || "test",
        problemDescription5: problemHeaderDescriptions[4]?.description || "test",
        problemDescription6: problemHeaderDescriptions[5]?.description || "test",
        problemIcon1: "test",
        problemIcon2: "test",
        problemIcon3: "test",
        problemIcon4: "test",
        problemIcon5: "test",
        problemIcon6: "test"
    };

    return problemResponse;
}

module.exports = problemController;
