const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processBusinessModel(submission, prompts) {

    const {businessModelPrompts} = prompts
    const { product, companyDetails, businessModel } = submission;
    const { productOverview } = product;
    const { companyOverview } = companyDetails;

    const revenueModel = await GPT(businessModelPrompts.revenueModel.prompt, productOverview);

    const revenueStreamGPT = await NestedGPT(
        businessModelPrompts.revenueStreamGPT.prompt,
        businessModelPrompts.revenueStreamGPT.Refine,
        `${productOverview} ${businessModel.businessModel}`
    );
    const revenueStreamPoints = cleanAndSplit(revenueStreamGPT);

    const revenueStreamHeaderDescriptions = await Promise.all(
        revenueStreamPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(businessModelPrompts.revenueStreamPointHeader.prompt, description);
            return { header: finalHeader, description };
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
        revenueModel:revenueModel,
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
