// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const hexToRgb = require('../../utils/hex_to_rgb');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const mixColors = require('../../utils/mixcolors');
const cleanHeader = require('../../utils/cleanHeader');

async function Cover(submission,prompts,response) {
    const {aboutPrompts} = prompts
    const { about, companyDetails } = submission;
    const {companyName,tagline,logo} = about;
    const { companyOverview } = companyDetails;

    const tagLine = tagline === ""
        ? await GPT(aboutPrompts.tagline.prompt, `User Resonse: ${companyOverview} Existing Response: ${response.about.tagLine}`)
        : tagline;

    const aboutResponse = {
        companyName,
        companyLogo:logo,
        tagLine,
        coverImage: 'freepik',

    };
    console.log("about...");
    return aboutResponse;
}

module.exports = Cover;
