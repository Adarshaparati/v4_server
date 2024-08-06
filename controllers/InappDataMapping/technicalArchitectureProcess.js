const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function ProcessTechnicalArchitecture(submission, prompts,response) {
    
    const {productPrompts} = prompts;
    const { product} = submission;
    const { technicalArchitecture} = product;


    console.log(`User Response: ${technicalArchitecture} Existing Response: ${response.product.inputs} ${response.product.technologyPlatform} ${response.product.valueBasedOutput}`)
    const data = GPT(productPrompts.inputs.prompt,`User Response: ${technicalArchitecture} Existing Response: ${response.product.inputs} ${response.product.technologyPlatform} ${response.product.valueBasedOutput}`)

    const inputs = await GPT(productPrompts.inputs.Refine,`User Response: ${data} Existing Response: ${response.product.inputs} `)
    const technologyPlatform = await GPT(productPrompts.technologyPlatform.Refine,`User Response: ${data} Existing Response: ${response.product.technologyPlatform} `)
    const valueBasedOutput = await GPT(productPrompts.valueBasedOutput.Refine,`User Response: ${data} Existing Response: ${response.product.valueBasedOutput} `)


    const productResponse = {
        inputs: inputs,
        technologyPlatform: technologyPlatform,
        valueBasedOutput: valueBasedOutput
    };
    console.log("technical...");
    return productResponse;
}

module.exports = ProcessTechnicalArchitecture;
