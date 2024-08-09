// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processCustomerPersona(submission, prompts,response) {
    const {gtmPrompts} = prompts;
    const {goToMarket} = submission;
    const persona = await GPT(gtmPrompts.persona.prompt,`User Response:${goToMarket.customerPersona} Existing Response: ${response.goToMarket.persona}`)
    const personaCategoryGPT = await GPT(gtmPrompts.personaCategoryGPT.prompt,`User Response:${goToMarket.customerPersona} Existing Response: ${response.goToMarket.personaCategoryGPT}`)
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

    const gtmResponse = {
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
    };
    console.log('CustomerPersona....')
    return gtmResponse;
}

module.exports = processCustomerPersona;
