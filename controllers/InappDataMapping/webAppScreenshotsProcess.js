const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription')


async function processWebAppScreenshots(submission,prompts){
    const {productScreenShotPrompts} = prompts;
    const {product,webScreenshots} = submission;
    const {productOverview} = product;
    const webScreenshotsDescription = await GPT(productScreenShotPrompts.webScreenshotsDescription.prompt,productOverview)
    const webScreenShotResponse = {
        webScreenshotsDescription: webScreenshotsDescription,
        webScreenshot1: webScreenshots.webScreenshots[0],
        webScreenshot2: webScreenshots.webScreenshots[1],
        webScreenshot3: webScreenshots.webScreenshots[2]
    }
    console.log("web screen...")
    return webScreenShotResponse;
}
module.exports = processWebAppScreenshots