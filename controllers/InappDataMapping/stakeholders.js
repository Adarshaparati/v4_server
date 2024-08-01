// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const cleanHeader = require('../../utils/cleanHeader')

async function processStakeholders(submission, prompts,response) {
    const {gtmPrompts} = prompts;
    const {goToMarket} = submission;
    const {keyStakeholders} = goToMarket;

    const stakeholderGPT = await GPT(gtmPrompts.stakeholderGPT.prompt, `User Response: ${keyStakeholders} Existing Response: ${response.goToMarket.stakeholderGPT}`);
    const stakeholderPoints = cleanAndSplit(stakeholderGPT);
    const stakeholdersTitle = await GPT(gtmPrompts.stakeholdersTitle.prompt,`User Response: ${stakeholderGPT} Existing Response: ${response.goToMarket.stakeholdersTitle}`)

    const stakeholderHeaderDescriptions = await Promise.all(
        stakeholderPoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(gtmPrompts.stakeholderPointHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
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
        customerProfileCoverImage: ""
    };
    console.log('stakeholders....')
    return gtmResponse;
}

module.exports = processStakeholders;
