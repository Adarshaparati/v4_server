

const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const calculateSOM = require('../../utils/calculateSOM');

async function processMarket(submission, prompts) {
    const {marketPrompts} = prompts
    const { companyDetails, market } = submission;
    const { companyOverview } = companyDetails;
    const { sector,otherSector,industry,otherIndustry} = market;

    let numTAM = null;
    let numSAM = null;
    
const marketDescription = await NestedGPT(marketPrompts.marketDescription.prompt, marketPrompts.marketDescription.Refine, `${sector} ${companyOverview}`);
const marketTitleGPTPromise = GPT(marketPrompts.marketTitleGPT.prompt, `${sector} ${marketDescription}`);
const industryCompetitivenessPromise = GPT(marketPrompts.industryCompetitiveness.prompt, sector);
let TAM = await NestedGPT(marketPrompts.TAM.prompt, marketPrompts.TAM.Refine, `${sector} ${companyOverview}`);
const TAMDescriptionPromise = GPT(marketPrompts.TAMDescription.prompt, marketDescription);
let SAM = await NestedGPT(marketPrompts.SAM.prompt, marketPrompts.SAM.Refine, `${TAM} ${sector} ${companyOverview}`);
const SAMDescriptionPromise = GPT(marketPrompts.SAMDescription.prompt, companyOverview);
const SOMDescriptionPromise = GPT(marketPrompts.SOMDescription.prompt, companyOverview);
const growthDriverGPTPromise = NestedGPT(marketPrompts.growthDriverGPT.prompt, marketPrompts.growthDriverGPT.Refine, companyOverview);
const TAMGrowthRatePromise = GPT(marketPrompts.TAMGrowthRate.prompt, marketDescription);
const SAMGrowthRatePromise = GPT(marketPrompts.SAMGrowthRate.prompt, marketDescription);
const [
  marketTitleGPT,
  industryCompetitiveness,
  TAMDescription,
  SAMDescription,
  SOMDescription,
  growthDriverGPT,
  TAMGrowthRate,
  SAMGrowthRate
] = await Promise.all([
  marketTitleGPTPromise,
  industryCompetitivenessPromise,
  TAMDescriptionPromise,
  SAMDescriptionPromise,
  SOMDescriptionPromise,
  growthDriverGPTPromise,
  TAMGrowthRatePromise,
  SAMGrowthRatePromise
]);

// Now you can use the resolved values of all promises

    try {
        TAM = TAM.replace(/[^0-9.]/g, ""); 
        numTAM = Number(TAM);
        if (isNaN(numTAM)) {
            throw new Error("Invalid TAM value");
        }
    } catch (error) {
        console.error("Error processing TAM:", error);
        numTAM = null; // Fallback value
    }

    try {
        
        SAM = SAM.replace(/[^0-9.]/g, "");
        numSAM = Number(SAM);
        if (isNaN(numSAM)) {
            throw new Error("Invalid SAM value");
        }
    } catch (error) {
        console.error("Error processing SAM:", error);
        numSAM = null; // Fallback value
    }

   
           
    const growthDrivers = cleanAndSplit(growthDriverGPT)
    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();

    console.log(numTAM,TAMGrowthRate)
    const TAMFuture = Math.round(numTAM*((1+(parseFloat(TAMGrowthRate.replace('%', ''))/100))**5))
    const SAMFuture = Math.round(numSAM*((1+(parseFloat(SAMGrowthRate.replace('%', ''))/100))**5))

    const marketResponse = {
        sector: sector,
        otherSector:otherSector,
        industry:industry,
        otherIndustry:otherIndustry,
        marketTitleGPT: "",
        marketTitle: marketTitleGPT,
        marketDescription: marketDescription,
        industryCompetitiveness: industryCompetitiveness,
        TAM: numTAM,
        TAMDescription: TAMDescription,
        SAM: numSAM,
        SAMDescription: SAMDescription,
        SOM: calculateSOM(industryCompetitiveness, numSAM),
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
        TAMGrowthRate:TAMGrowthRate,
        TAMFuture: TAMFuture,
        SAMGrowthRate: SAMGrowthRate,
        SAMFuture: SAMFuture
    };
    console.log("market...");
    return marketResponse;
}

module.exports = processMarket;
