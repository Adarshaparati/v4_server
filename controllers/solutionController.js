const { GPT, NestedGPT } = require('../services/gpt');
const cleanAndSplit = require('../utils/cleanandsplit');
const separateHeaderDescription = require('../utils/sepreateHeaderDescription');

async function solutionController(submission, solutionPrompts) {
    const { companyDetails } = submission;
    const { companyOverview } = companyDetails;

    const solutionTitle = await GPT(solutionPrompts.solutionTitle.prompt, companyOverview);
    const solutionStatement = await GPT(solutionPrompts.solutionStatement.prompt, companyOverview);
    const solutionGPT = await NestedGPT(
        solutionPrompts.solutionGPT.prompt,
        solutionPrompts.solutionGPT.Refine,
        companyOverview
    );

    const solutionPoints = cleanAndSplit(solutionGPT);

    const solutionHeaderDescriptions = await Promise.all(
        solutionPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(solutionPrompts.solutionPointHeader.prompt, description);
            return { header: finalHeader, description };
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
        iterativeSolution: "test",
        solutionTitle,
        solutionStatement,
        solutionGPT,
        solutionGPTCleaned: "test",
        solutionGPT1: "test",
        solutionGPT2: "test",
        solutionGPT3: "test",
        solutionGPT4: "test",
        solutionGPT5: "test",
        solutionGPT6: "test",
        solutionHeader1: solutionHeader1,
        solutionHeader2: solutionHeader2,
        solutionHeader3: solutionHeader3,
        solutionHeader4: solutionHeader4,
        solutionHeader5: solutionHeader5,
        solutionHeader6: solutionHeader6,
        solutionDescription1: solutionHeaderDescriptions[0]?.description || "test",
        solutionDescription2: solutionHeaderDescriptions[1]?.description || "test",
        solutionDescription3: solutionHeaderDescriptions[2]?.description || "test",
        solutionDescription4: solutionHeaderDescriptions[3]?.description || "test",
        solutionDescription5: solutionHeaderDescriptions[4]?.description || "test",
        solutionDescription6: solutionHeaderDescriptions[5]?.description || "test",
        solutionIcon1: "test",
        solutionIcon2: "test",
        solutionIcon3: "test",
        solutionIcon4: "test",
        solutionIcon5: "test",
        solutionIcon6: "test"
    };

    return solutionResponse;
}

module.exports = solutionController;
