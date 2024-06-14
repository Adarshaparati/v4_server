const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription')


async function processProductScreenshots(submission,productScreenShotPrompts){
    const {product} = submission;
    const {productOverview} = product;
    const mobileScreenshotsDescription = await GPT(productScreenShotPrompts.mobileScreenshotsDescription.prompt,productOverview)
    const webScreenshotsDescription = await GPT(productScreenShotPrompts.webScreenshotsDescription.prompt,productOverview)
    const {productScreen} = submission;
    const productScreenShotResponse = {
        mobileScreenshotsDescription: mobileScreenshotsDescription,
        mobileScreenshot1: productScreen.mobileScreenshots[0],
        mobileScreenshot2: productScreen.mobileScreenshots[1],
        mobileScreenshot3: productScreen.mobileScreenshots[2],
        webScreenshotsDescription: webScreenshotsDescription,
        webScreenshot1: productScreen.webScreenshots[0],
        webScreenshot2: productScreen.webScreenshots[1],
        webScreenshot3: productScreen.webScreenshots[2]
    }
    return productScreenShotResponse;
}
module.exports = processProductScreenshots