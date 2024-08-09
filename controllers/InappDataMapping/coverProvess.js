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
        primaryColorR: response.about.primaryColorR,
        primaryColorG: response.about.primaryColorG,
        primaryColorB: response.about.primaryColorB,
        primaryColorCheck: response.about.primaryColorCheck,
        secondaryColorR: response.about.secondaryColorR,
        secondaryColorG: response.about.secondaryColorG,
        secondaryColorB: response.about.secondaryColorB,
        secondaryColorCheck: response.about.secondaryColorCheck,
        colorP100: response.about.colorP100,
        colorP75_S25: response.about.colorP75_S25,
        colorP50_S50: response.about.colorP50_S50,
        colorP25_S75: response.about.colorP25_S75,
        colorS100: response.about.colorS100,
        colorF_S100: response.about.colorF_S100,
        colorF_P100: response.about.colorF_P100,
        colorF_P75S25: response.about.colorF_P75S25,
        colorF_P50S50: response.about.colorF_P50S50,
        colorF_P25S75: response.about.colorF_P25S75,
        SCL: "#FFFFFF",
        SCD: "#000000",
        tagLine,
        coverImage: 'freepik',
        aboutTitle: response.about.aboutTitle,
        aboutVision: response.about.aboutVision,
        aboutGPT: response.about.aboutGPT,
        aboutGPTCleaned: "",
        aboutGPT1: "",
        aboutGPT2: "",
        aboutGPT3: "",
        aboutGPT4: "",
        aboutGPT5: "",
        aboutHeader1: response.about.aboutHeader1,
        aboutHeader2: response.about.aboutHeader2,
        aboutHeader3: response.about.aboutHeader3,
        aboutHeader4: response.about.aboutHeader4,
        aboutHeader5: response.about.aboutHeader5,
        about1: response.about.about1,
        about2: response.about.about2,
        about3: response.about.about3,
        about4: response.about.about4,
        about5: response.about.about5,
        aboutImageURL: "freepik",

    };
    console.log("about...");
    return aboutResponse;
}

module.exports = Cover;
