const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processProductRoadMap(submission, prompts,response) {
    
    const {productPrompts} = prompts;
    const { product} = submission;
    const { productOverview } = product;

    const productRoadmapTitle = await GPT(productPrompts.productRoadmapTitle.prompt, `User Response: ${productOverview} Existing Response: ${response.product.productRoadmapTitle}`);
    const roadMapPhaseGPT = await GPT(productPrompts.phaseGPT.prompt, `User Response: ${productOverview} Existing Response: ${response.product.phaseGPT}`);
    const roadMapPhasePoints = cleanAndSplit(roadMapPhaseGPT);

    const roadMapPhaseHeaderDescriptions = await Promise.all(
        roadMapPhasePoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(productPrompts.roadMapPhasePointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    // Resolve phase features
    const [
        roadMapPhaseFeature1,
        roadMapPhaseFeature2,
        roadMapPhaseFeature3,
    ] = await Promise.all(
        roadMapPhaseHeaderDescriptions.map(({ description }) => GPT(productPrompts.phaseFeature.prompt, description))
    );

    const productResponse = {
        productRoadmapTitle:cleanHeader(productRoadmapTitle),
        phaseGPT: roadMapPhaseGPT,
        phaseGPTCleaned: "",
        phaseGPT1: "",
        phaseGPT2: "",
        phaseGPT3: "",
        phaseHeader1Name: roadMapPhaseHeaderDescriptions[0]?.header || "",
        phaseHeader2Name: roadMapPhaseHeaderDescriptions[1]?.header || "",
        phaseHeader3Name: roadMapPhaseHeaderDescriptions[2]?.header || "",
        phaseDescription1: roadMapPhaseHeaderDescriptions[0]?.description || "",
        phaseDescription2: roadMapPhaseHeaderDescriptions[1]?.description || "",
        phaseDescription3: roadMapPhaseHeaderDescriptions[2]?.description || "",
        phaseFeatures1: roadMapPhaseFeature1,
        phaseFeatures2: roadMapPhaseFeature2,
        phaseFeatures3: roadMapPhaseFeature3,
    };
    console.log("product...");
    return productResponse;
}

module.exports = processProductRoadMap;
