const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processProductDetails(submission, prompts,response) {
    
    const {productPrompts} = prompts;
    const { product} = submission;
    const { productOverview } = product;

    const productTitle = await GPT(productPrompts.productTitle.prompt, `User Response: ${productOverview} Existing Response: ${response.product.productTitle}`);
    const productOverviewResponse = await GPT(productPrompts.productOverview.prompt, `User Response: ${productOverview} Existing Response: ${response.product.productOverview}`);
    const featureGPT = await GPT(productPrompts.featureGPT.prompt,`User Response: ${productOverview} Existing Response: ${response.product.featureGPT}`);
    const featurePoints = cleanAndSplit(featureGPT);


    // Resolve feature headers and descriptions
    const featureHeaderDescriptions = await Promise.all(
        featurePoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(productPrompts.featurePointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );


    const productResponse = {
        productTitle:cleanHeader(productTitle),
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
    };
    console.log("product...");
    return productResponse;
}

module.exports = processProductDetails;
