const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function ProcessTechnicalArchitecture(submission, prompts) {
    
    const {productPrompts} = prompts;
    const { product} = submission;
    const { technicalArchitecture} = product;

    const data = GPT(productPrompts.inputs.prompt,`product: ${product} technical Architecture: ${technicalArchitecture}`)

    const inputs = await GPT(productPrompts.inputs.Refine,data)
    const technologyPlatform = await GPT(productPrompts.technologyPlatform.Refine,data)
    const valueBasedOutput = await GPT(productPrompts.valueBasedOutput.Refine,data)


    const productResponse = {
        inputs: inputs,
        technologyPlatform: technologyPlatform,
        valueBasedOutput: valueBasedOutput
    };
    console.log("technical...");
    return productResponse;
}

module.exports = ProcessTechnicalArchitecture;
