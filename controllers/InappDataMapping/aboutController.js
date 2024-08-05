// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const hexToRgb = require('../../utils/hex_to_rgb');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const mixColors = require('../../utils/mixcolors');
const cleanHeader = require('../../utils/cleanHeader');

async function processAbout(submission,prompts,response) {
    const {aboutPrompts} = prompts
    const { about, companyDetails } = submission;
    const { companyOverview } = companyDetails;
    const {tagline} = about
    

    const tagLine = tagline === ""
        ? await GPT(aboutPrompts.tagline.prompt, `Existing Response: ${response.about.tagLine}`)
        : tagline;


    const aboutVision = await GPT(aboutPrompts.aboutVision.prompt, `User Response: ${tagLine} Existing Response: ${response.about.aboutVision}`);
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
