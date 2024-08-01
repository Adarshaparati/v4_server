const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processBusinessModel(submission, prompts,response) {

    const {businessModelPrompts} = prompts
    const { product, businessModel } = submission;
    const { productOverview } = product;

    const revenueModel = await GPT(businessModelPrompts.revenueModel.prompt, `User Response: ${businessModel.businessModel} Existing Response: ${response.businessModel.revenueModel}`);

    const revenueStreamGPT = await NestedGPT(
        businessModelPrompts.revenueStreamGPT.prompt,
       `User Response: ${productOverview} ${businessModel.businessModel} Existing Response: ${response.businessModel.revenueModel}`
    );
    const revenueStreamPoints = cleanAndSplit(revenueStreamGPT);

    const revenueStreamHeaderDescriptions = await Promise.all(
        revenueStreamPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(businessModelPrompts.revenueStreamPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        revenueStreamHeader1,
        revenueStreamHeader2,
        revenueStreamHeader3,
        revenueStreamHeader4,
    ] = await Promise.all(
        revenueStreamHeaderDescriptions.map(item => item.header)
    );

    const businessModelResponse = {
        revenueModel:cleanHeader(revenueModel),
        revenueModelImage: "",
        revenueStreamGPT,
        revenueStreamGPTCleaned: "",
        revenueStreamGPT1: "",
        revenueStreamGPT2: "",
        revenueStreamGPT3: "",
        revenueStreamGPT4: "",
        stream1: revenueStreamHeader1,
        stream2: revenueStreamHeader2,
        stream3: revenueStreamHeader3,
        stream4: revenueStreamHeader4,
        streamDescription1: revenueStreamHeaderDescriptions[0]?.description || "",
        streamDescription2: revenueStreamHeaderDescriptions[1]?.description || "",
        streamDescription3: revenueStreamHeaderDescriptions[2]?.description || "",
        streamDescription4: revenueStreamHeaderDescriptions[3]?.description || "",
        streamIcon1: "",
        streamIcon2: "",
        streamIcon3: "",
        streamIcon4: ""
    };
    console.log("business model...");
    return businessModelResponse;
}

module.exports = processBusinessModel;
