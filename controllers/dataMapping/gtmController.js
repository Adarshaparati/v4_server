// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processGTMStrategy(submission, prompts) {
    const {gtmPrompts} = prompts;
    const { product, companyDetails } = submission;
    const { productOverview } = product;
    const { companyOverview } = companyDetails;
    const {goToMarket} = submission;
    const {keyStakeholders} = goToMarket;

    // Generate initial stakeholder points
    
    const stakeholderGPT = await NestedGPT(gtmPrompts.stakeholderGPT.prompt, gtmPrompts.stakeholderGPT.Refine, `${companyOverview} ${productOverview}`);
    const stakeholderPoints = cleanAndSplit(stakeholderGPT);
    const stakeholdersTitle = await GPT(gtmPrompts.stakeholdersTitle.prompt,stakeholderGPT)
    // Resolve headers and descriptions
    const stakeholderHeaderDescriptions = await Promise.all(
        stakeholderPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.stakeholderPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const persona = await GPT(gtmPrompts.persona.prompt,productOverview)
    const personaCategoryGPT = await NestedGPT(gtmPrompts.personaCategoryGPT.prompt,gtmPrompts.personaCategoryGPT.Refine,`${productOverview} ${companyOverview}`)
    const personaPoints = cleanAndSplit(personaCategoryGPT);


    const personaHeaderDescriptions = await Promise.all(
        personaPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.personaPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        personaHeader1,
        personaHeader2,
        personaHeader3
    ] = await Promise.all(
        personaHeaderDescriptions.map(item => item.header)
    );

    const  gtmOverview  = await NestedGPT(gtmPrompts.gtmOverview.prompt,gtmPrompts.gtmOverview.Refine,`${companyOverview} ${productOverview} ${stakeholderGPT}`)
    const gtmTitle  = await GPT(gtmPrompts.gtmTitle.prompt,gtmOverview)
    const gtmGPT = await NestedGPT(gtmPrompts.gtmGPT.prompt,gtmPrompts.gtmGPT.Refine,`${companyOverview} ${productOverview} ${stakeholderGPT}`)
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
        stakeholdersTitle: cleanHeader(stakeholdersTitle),
        stakeholderGPT,
        stakeholderGPTCleaned: "",
        stakeholderGPT1: "",
        stakeholderGPT2: "",
        stakeholderGPT3: "",
        stakeholderGPT4: "",
        stakeholder1: stakeholderHeaderDescriptions[0]?.header || "",
        stakeholder2: stakeholderHeaderDescriptions[1]?.header || "",
        stakeholder3: stakeholderHeaderDescriptions[2]?.header || "",
        stakeholder4: stakeholderHeaderDescriptions[3]?.header || "",
        benefits1: stakeholderHeaderDescriptions[0]?.description || "",
        benefits2: stakeholderHeaderDescriptions[1]?.description || "",
        benefits3: stakeholderHeaderDescriptions[2]?.description || "",
        benefits4: stakeholderHeaderDescriptions[3]?.description || "",
        customerProfileIcon1: "",
        customerProfileIcon2: "",
        customerProfileIcon3: "",
        customerProfileIcon4: "",
        customerProfileCoverImage: "",
        persona: cleanHeader(persona),
        personaCategoryGPT: personaCategoryGPT,
        personaCategoryGPTCleaned: "",
        personaCategoryGPT1: "",
        personaCategoryGPT2: "",
        personaCategoryGPT3: "",
        personaHeader1: personaHeader1,
        personaHeader2: personaHeader2,
        personaHeader3: personaHeader3,
        personaDescription1: personaHeaderDescriptions[0]?.description || "",
        personaDescription2: personaHeaderDescriptions[1]?.description || "",
        personaDescription3: personaHeaderDescriptions[2]?.description || "",
        personaIcon1: "",
        personaIcon2: "",
        personaIcon3: "",
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
