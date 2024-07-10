const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription')


async function processMobileAppScreenshotsScreenshots(submission,prompts){
    const {productScreenShotPrompts} = prompts;
    const {product,mobileScreenshots} = submission;
    const {productOverview} = product;

    const mobileScreenshotsDescription = await GPT(productScreenShotPrompts.mobileScreenshotsDescription.prompt,productOverview)
    console.log('--------------------------------------------------------------------------------',mobileScreenshots.mobileScreenshots[0])
    const mobileScreenShotResponse = {
        mobileScreenshotsDescription: mobileScreenshotsDescription,
        mobileScreenshot1: mobileScreenshots.mobileScreenshots[0],
        mobileScreenshot2: mobileScreenshots.mobileScreenshots[1],
        mobileScreenshot3: mobileScreenshots.mobileScreenshots[2],
    }
    console.log("mobile screen...")
    return mobileScreenShotResponse;
}
module.exports = processMobileAppScreenshotsScreenshots