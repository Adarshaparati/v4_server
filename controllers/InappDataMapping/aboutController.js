// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const hexToRgb = require('../../utils/hex_to_rgb');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const mixColors = require('../../utils/mixcolors');
const cleanHeader = require('../../utils/cleanHeader');

async function processAbout(submission,prompts,response) {
    const {aboutPrompts} = prompts
    const {companyDetails } = submission;
    const { companyOverview } = companyDetails;
    console.log(`User Response: ${companyOverview} Existing Response: ${response.about.aboutVision}`)

    const aboutVision = await GPT(aboutPrompts.aboutVision.prompt, `User Response: ${companyOverview} Existing Response: ${response.about.aboutVision}`);
    const aboutTitle = GPT(aboutPrompts.aboutTitle.prompt, `User Response:${companyOverview} ${aboutVision} Existing Response: ${response.about.aboutTitle}`);
    const aboutGPT = NestedGPT(aboutPrompts.aboutGPT.prompt, aboutPrompts.aboutGPT.Refine, `User Response: ${companyOverview} ${aboutVision} Existing Response: ${response.about.aboutGPT}`);
    const aboutpointsPromise = aboutGPT.then(cleanAndSplit);
    const aboutpoints = await aboutpointsPromise;

    const aboutHeaderDescriptions = await Promise.all(
        aboutpoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(aboutPrompts.aboutPointtsHeader.prompt, description);
            return { header: cleanHeader(finalHeader), description };
        })
    );

    const [
        resolvedAboutVision,
        resolvedAboutTitle,
        resolvedAboutGPT,
        resolvedAboutHeader1,
        resolvedAboutHeader2,
        resolvedAboutHeader3,
        resolvedAboutHeader4,
        resolvedAboutHeader5
    ] = await Promise.all([
        aboutVision,
        aboutTitle,
        aboutGPT,
        ...aboutHeaderDescriptions.map(item => item.header)
    ]);

    const aboutResponse = {
        companyName:response.about.companyName,
        companyLogo:response.about.companyLogo,
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
        tagLine:response.about.tagLine,
        coverImage: 'freepik',
        aboutTitle: cleanHeader(resolvedAboutTitle),
        aboutVision: resolvedAboutVision,
        aboutGPT: resolvedAboutGPT,
        aboutGPTCleaned: "",
        aboutGPT1: "",
        aboutGPT2: "",
        aboutGPT3: "",
        aboutGPT4: "",
        aboutGPT5: "",
        aboutHeader1: resolvedAboutHeader1,
        aboutHeader2: resolvedAboutHeader2,
        aboutHeader3: resolvedAboutHeader3,
        aboutHeader4: resolvedAboutHeader4,
        aboutHeader5: resolvedAboutHeader5,
        about1: aboutHeaderDescriptions[0]?.description || "",
        about2: aboutHeaderDescriptions[1]?.description || "",
        about3: aboutHeaderDescriptions[2]?.description || "",
        about4: aboutHeaderDescriptions[3]?.description || "",
        about5: aboutHeaderDescriptions[4]?.description || "",
        aboutImageURL: "freepik",
    };
    console.log("about...");
    return aboutResponse;
}

module.exports = processAbout;
