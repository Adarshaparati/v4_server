const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processProductDetails(submission, productPrompts) {
    const { product, companyDetails } = submission;
    const { productOverview } = product;
    const { companyOverview } = companyDetails;

    const productTitle = await GPT(productPrompts.productTitle.prompt, productOverview);
    const productOverviewResponse = await GPT(productPrompts.productOverview.prompt, productOverview);
    const featureGPT = await NestedGPT(productPrompts.featureGPT.prompt, productPrompts.featureGPT.Refine, productOverview);
    const productRoadmapTitle = await GPT(productPrompts.productRoadmapTitle.prompt, productOverview);
    const roadMapPhaseGPT = await NestedGPT(productPrompts.phaseGPT.prompt, productPrompts.phaseGPT.Refine, `${productOverview} ${companyOverview}`);
    const featurePoints = cleanAndSplit(featureGPT);
    const roadMapPhasePoints = cleanAndSplit(roadMapPhaseGPT);

    // Resolve feature headers and descriptions
    const featureHeaderDescriptions = await Promise.all(
        featurePoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(productPrompts.featurePointHeader.prompt, description);
            return { header: finalHeader, description };
        })
    );

    // Resolve roadmap phase headers and descriptions
    const roadMapPhaseHeaderDescriptions = await Promise.all(
        roadMapPhasePoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(productPrompts.roadMapPhasePointHeader.prompt, description);
            return { header: finalHeader, description };
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
        productTitle,
        productOverview: productOverviewResponse,
        featureGPT,
        featureGPTCleaned: "test",
        featureGPT1: "test",
        featureGPT2: "test",
        featureGPT3: "test",
        featureGPT4: "test",
        featureGPT5: "test",
        featureGPT6: "test",
        feature1: featureHeaderDescriptions[0]?.header || "test",
        feature2: featureHeaderDescriptions[1]?.header || "test",
        feature3: featureHeaderDescriptions[2]?.header || "test",
        feature4: featureHeaderDescriptions[3]?.header || "test",
        feature5: featureHeaderDescriptions[4]?.header || "test",
        feature6: featureHeaderDescriptions[5]?.header || "test",
        featureDescription1: featureHeaderDescriptions[0]?.description || "test",
        featureDescription2: featureHeaderDescriptions[1]?.description || "test",
        featureDescription3: featureHeaderDescriptions[2]?.description || "test",
        featureDescription4: featureHeaderDescriptions[3]?.description || "test",
        featureDescription5: featureHeaderDescriptions[4]?.description || "test",
        featureDescription6: featureHeaderDescriptions[5]?.description || "test",
        featureIcon1: "test",
        featureIcon2: "test",
        featureIcon3: "test",
        featureIcon4: "test",
        featureIcon5: "test",
        featureIcon6: "test",
        productRoadmapTitle,
        phaseGPT: roadMapPhaseGPT,
        phaseGPTCleaned: "test",
        phaseGPT1: "test",
        phaseGPT2: "test",
        phaseGPT3: "test",
        phaseHeader1Name: roadMapPhaseHeaderDescriptions[0]?.header || "test",
        phaseHeader2Name: roadMapPhaseHeaderDescriptions[1]?.header || "test",
        phaseHeader3Name: roadMapPhaseHeaderDescriptions[2]?.header || "test",
        phaseDescription1: roadMapPhaseHeaderDescriptions[0]?.description || "test",
        phaseDescription2: roadMapPhaseHeaderDescriptions[1]?.description || "test",
        phaseDescription3: roadMapPhaseHeaderDescriptions[2]?.description || "test",
        phaseFeatures1: roadMapPhaseFeature1,
        phaseFeatures2: roadMapPhaseFeature2,
        phaseFeatures3: roadMapPhaseFeature3,
        inputs: "test",
        technologyPlatform: "test",
        valueBasedOutput: "test"
    };

    return productResponse;
}

module.exports = processProductDetails;
