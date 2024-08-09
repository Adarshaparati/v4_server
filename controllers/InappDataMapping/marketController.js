const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const calculateSOM = require('../../utils/calculateSOM');
const cleanHeader = require('../../utils/cleanHeader')

async function processMarket(submission, prompts,response) {
    const {marketPrompts} = prompts
    const {market} = submission;
    const { sector,otherSector,industry,otherIndustry} = market;

const marketDescription = await GPT(marketPrompts.marketDescription.prompt, `User Response: ${sector} ${market.marketDescription} Existing Response: ${response.market.marketDescription}`);
const marketTitleGPTPromise = GPT(marketPrompts.marketTitleGPT.prompt, `User Response: ${sector} ${market.marketDescription} Existing Response: ${response.market.marketTitle}`);
const industryCompetitivenessPromise = GPT(marketPrompts.industryCompetitiveness.prompt, `User Response: ${sector} Existing Response: ${response.market.industryCompetitiveness}`);

const TAMDescriptionPromise = GPT(marketPrompts.TAMDescription.prompt, `User Response: ${market.marketDescription} Existing Response: ${response.market.TAMDescription}`);
const SAMDescriptionPromise = GPT(marketPrompts.SAMDescription.prompt, `User Response: ${market.marketDescription} Existing Response: ${response.market.SAMDescription}`);
const SOMDescriptionPromise = GPT(marketPrompts.SOMDescription.prompt, `User Response: ${market.marketDescription} Existing Response: ${response.market.SOMDescription}`);

const growthDriverGPTPromise = GPT(marketPrompts.growthDriverGPT.prompt, `User Response: ${market.marketDescription} Existing Response: ${response.market.growthDriverGPT}`);

const [
  marketTitleGPT,
  industryCompetitiveness,
  TAMDescription,
  SAMDescription,
  SOMDescription,
  growthDriverGPT,
] = await Promise.all([
  marketTitleGPTPromise,
  industryCompetitivenessPromise,
  TAMDescriptionPromise,
  SAMDescriptionPromise,
  SOMDescriptionPromise,
  growthDriverGPTPromise,
]);



           
    const growthDrivers = cleanAndSplit(growthDriverGPT)
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    // console.log(numTAM,TAMGrowthRate)
    const TAMFuture = Math.round(market.TAM*((1+(parseFloat(market.TAMGrowthRate.replace('%', ''))/100))**5))
    const SAMFuture = Math.round(market.SAM*((1+(parseFloat(market.SAMGrowthRate.replace('%', ''))/100))**5))

    const marketResponse = {
        sector: sector,
        otherSector:otherSector,
        industry:industry,
        otherIndustry:otherIndustry,
        marketTitleGPT: "",
        marketTitle: cleanHeader(marketTitleGPT),
        marketDescription: marketDescription,
        industryCompetitiveness: industryCompetitiveness,
        TAM: Math.round(market.TAM),
        TAMDescription: TAMDescription,
        SAM: Math.round(market.SAM),
        SAMDescription: SAMDescription,
        SOM: calculateSOM(industryCompetitiveness, market.SAM),
        SOMDescription: SOMDescription,
        growthDriverGPT: growthDriverGPT,
        growthDriverGPTCleaned: "",
        growthDriverGPT1: "",
        growthDriverGPT2: "",
        growthDriverGPT3: "",
        growthDriverGPT4: "",
        growthDriverGPT5: "",
        growthDriver1: growthDrivers[0],
        growthDriver2: growthDrivers[1],
        growthDriver3: growthDrivers[2],
        growthDriver4: growthDrivers[3],
        growthDriver5: growthDrivers[4],
        year1: currentYear,
        year2: currentYear+5,
        TAMGrowthRate:market.TAMGrowthRate,
        TAMFuture: TAMFuture,
        SAMGrowthRate: market.SAMGrowthRate,
        SAMFuture: SAMFuture
    };
    console.log("inapp market...");
    return marketResponse;
}

module.exports = processMarket;
