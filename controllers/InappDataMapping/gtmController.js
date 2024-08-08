// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processGTMStrategy(submission, prompts,response) {
    const {gtmPrompts} = prompts;
    const {goToMarket} = submission;

    const  gtmOverview  = await GPT(gtmPrompts.gtmOverview.prompt ,`User Response:${goToMarket.goToMarketStrategy} Existing Response: ${response.goToMarket.gtmOverview}`)
    const gtmTitle  = await GPT(gtmPrompts.gtmTitle.prompt,`User Response:${goToMarket.goToMarketStrategy} Existing Response: ${response.goToMarket.gtmTitle}`)
    const gtmGPT = await GPT(gtmPrompts.gtmGPT.prompt,`User Response:${goToMarket.goToMarketStrategy} Existing Response: ${response.goToMarket.gtmGPT}`)
    const gtmPoints = cleanAndSplit(gtmGPT);


    const gtmHeaderDescriptions = await Promise.all(
        gtmPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.gtmPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        gtmHeader1,
        gtmHeader2,
        gtmHeader3,
        gtmHeader4,
        gtmHeader5
    ] = await Promise.all(
        gtmHeaderDescriptions.map(item => item.header)
    );


    const gtmResponse = {
        gtmTitle: cleanHeader(gtmTitle),
        gtmOverview: gtmOverview,
        gtmCoverImageLandscape: "",
        gtmGPT: gtmGPT,
        gtmGPTCleaned: "",
        gtmGPT1: "",
        gtmGPT2: "",
        gtmGPT3: "",
        gtmGPT4: "",
        gtmGPT5: "",
        gtmHeader1: gtmHeader1,
        gtmHeader2: gtmHeader2,
        gtmHeader3: gtmHeader3,
        gtmHeader4: gtmHeader4,
        gtmHeader5: gtmHeader5,
        gtmDescription1: gtmHeaderDescriptions[0]?.description || "",
        gtmDescription2: gtmHeaderDescriptions[1]?.description || "",
        gtmDescription3: gtmHeaderDescriptions[2]?.description || "",
        gtmDescription4: gtmHeaderDescriptions[3]?.description || "",
        gtmDescription5: gtmHeaderDescriptions[4]?.description || "",
        gtmIcon1: "",
        gtmIcon2: "",
        gtmIcon3: "",
        gtmIcon4: "",
        gtmIcon5: ""
    };
    console.log('gtm....')
    return gtmResponse;
}

module.exports = processGTMStrategy;
