const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processBusinessModel(submission, businessModelPrompts) {
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
        revenueStreamHeader5,
        revenueStreamHeader6
    ] = await Promise.all(
        revenueStreamHeaderDescriptions.map(item => item.header)
    );

    const businessModelResponse = {
        revenueModel,
        revenueModelImage: "test",
        revenueStreamGPT,
        revenueStreamGPTCleaned: "test",
        revenueStreamGPT1: "test",
        revenueStreamGPT2: "test",
        revenueStreamGPT3: "test",
        revenueStreamGPT4: "test",
        stream1: revenueStreamHeader1,
        stream2: revenueStreamHeader2,
        stream3: revenueStreamHeader3,
        stream4: revenueStreamHeader4,
        streamDescription1: revenueStreamHeaderDescriptions[0]?.description || "test",
        streamDescription2: revenueStreamHeaderDescriptions[1]?.description || "test",
        streamDescription3: revenueStreamHeaderDescriptions[2]?.description || "test",
        streamDescription4: revenueStreamHeaderDescriptions[3]?.description || "test",
        streamIcon1: "test",
        streamIcon2: "test",
        streamIcon3: "test",
        streamIcon4: "test"
    };

    return businessModelResponse;
}

module.exports = processBusinessModel;
