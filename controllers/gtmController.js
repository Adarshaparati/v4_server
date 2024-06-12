// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../services/gpt');
const cleanAndSplit = require('../utils/cleanandsplit');
const separateHeaderDescription = require('../utils/sepreateHeaderDescription');

async function gtmController(submission, gtmPrompts) {
    const { product, companyDetails } = submission;
    const { productOverview } = product;
    const { companyOverview } = companyDetails;
    const {goToMarket} = submission;
    const {keyStakeholders} = goToMarket;

    // Generate initial stakeholder points
    const stakeholderGPT = await NestedGPT(gtmPrompts.stakeholderGPT.prompt, gtmPrompts.stakeholderGPT.Refine, `${companyOverview} ${productOverview}`);
    const stakeholderPoints = cleanAndSplit(stakeholderGPT);

    // Resolve headers and descriptions
    const stakeholderHeaderDescriptions = await Promise.all(
        stakeholderPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.stakeholderPointHeader.prompt, description);
            return { header: finalHeader, description };
        })
    );

    const persona = await GPT(gtmPrompts.persona.prompt,productOverview)
    const personaCategoryGPT = await NestedGPT(gtmPrompts.personaCategoryGPT.prompt,gtmPrompts.personaCategoryGPT.Refine,`${productOverview} ${companyOverview}`)
    const personaPoints = cleanAndSplit(personaCategoryGPT);


    const personaHeaderDescriptions = await Promise.all(
        personaPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.personaPointHeader.prompt, description);
            return { header: finalHeader, description };
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
            return { header: finalHeader, description };
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
        stakeholdersTitle: "test",
        stakeholderGPT,
        stakeholderGPTCleaned: "test",
        stakeholderGPT1: "test",
        stakeholderGPT2: "test",
        stakeholderGPT3: "test",
        stakeholderGPT4: "test",
        stakeholder1: stakeholderHeaderDescriptions[0]?.header || "test",
        stakeholder2: stakeholderHeaderDescriptions[1]?.header || "test",
        stakeholder3: stakeholderHeaderDescriptions[2]?.header || "test",
        stakeholder4: stakeholderHeaderDescriptions[3]?.header || "test",
        benefits1: stakeholderHeaderDescriptions[0]?.description || "test",
        benefits2: stakeholderHeaderDescriptions[1]?.description || "test",
        benefits3: stakeholderHeaderDescriptions[2]?.description || "test",
        benefits4: stakeholderHeaderDescriptions[3]?.description || "test",
        customerProfileIcon1: "test",
        customerProfileIcon2: "test",
        customerProfileIcon3: "test",
        customerProfileIcon4: "test",
        customerProfileCoverImage: "test",
        persona: persona,
        personaCategoryGPT: personaCategoryGPT,
        personaCategoryGPTCleaned: "test",
        personaCategoryGPT1: "test",
        personaCategoryGPT2: "test",
        personaCategoryGPT3: "test",
        personaHeader1: personaHeader1,
        personaHeader2: personaHeader2,
        personaHeader3: personaHeader3,
        personaDescription1: personaHeaderDescriptions[0]?.description || "",
        personaDescription2: personaHeaderDescriptions[1]?.description || "",
        personaDescription3: personaHeaderDescriptions[2]?.description || "",
        personaIcon1: "test",
        personaIcon2: "test",
        personaIcon3: "test",
        gtmTitle: gtmTitle,
        gtmOverview: gtmOverview,
        gtmCoverImageLandscape: "test",
        gtmGPT: gtmGPT,
        gtmGPTCleaned: "test",
        gtmGPT1: "test",
        gtmGPT2: "test",
        gtmGPT3: "test",
        gtmGPT4: "test",
        gtmGPT5: "test",
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
        gtmIcon1: "test",
        gtmIcon2: "test",
        gtmIcon3: "test",
        gtmIcon4: "test",
        gtmIcon5: "test"
    };

    return gtmResponse;
}

module.exports = gtmController;
