const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processProductDetails(submission, prompts) {
    
    const {productPrompts} = prompts;
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
        featureGPTCleaned: "",
        featureGPT1: "",
        featureGPT2: "",
        featureGPT3: "",
        featureGPT4: "",
        featureGPT5: "",
        featureGPT6: "",
        feature1: featureHeaderDescriptions[0]?.header || "",
        feature2: featureHeaderDescriptions[1]?.header || "",
        feature3: featureHeaderDescriptions[2]?.header || "",
        feature4: featureHeaderDescriptions[3]?.header || "",
        feature5: featureHeaderDescriptions[4]?.header || "",
        feature6: featureHeaderDescriptions[5]?.header || "",
        featureDescription1: featureHeaderDescriptions[0]?.description || "",
        featureDescription2: featureHeaderDescriptions[1]?.description || "",
        featureDescription3: featureHeaderDescriptions[2]?.description || "",
        featureDescription4: featureHeaderDescriptions[3]?.description || "",
        featureDescription5: featureHeaderDescriptions[4]?.description || "",
        featureDescription6: featureHeaderDescriptions[5]?.description || "",
        featureIcon1: "",
        featureIcon2: "",
        featureIcon3: "",
        featureIcon4: "",
        featureIcon5: "",
        featureIcon6: "",
        productRoadmapTitle,
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

module.exports = processProductDetails;
