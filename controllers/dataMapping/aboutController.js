// Assuming required modules are already in place.
const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const hexToRgb = require('../../utils/hex_to_rgb');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');
const mixColors = require('../../utils/mixcolors');

async function processAbout(submission,prompts) {
    const {aboutPrompts} = prompts
    const { about, companyDetails } = submission;
    const { tagline, primaryColor: primaryColorHex, secondaryColor: secondaryColorHex, companyName, logo} = about;
    const { companyOverview } = companyDetails;

    const tagLine = tagline === ""
        ? await GPT(aboutPrompts.tagline.prompt, companyOverview)
        : tagline;

    const primaryrgb = hexToRgb(primaryColorHex);
    const secondaryrgb = hexToRgb(secondaryColorHex);

    const colorF_S100 = GPT(`Background Color ${secondaryColorHex}`,aboutPrompts.F_SP100.prompt);
    const colorF_P100 = GPT(`Background Color ${primaryColorHex}`,aboutPrompts.F_SP100.prompt);

    const primaryColorCheck = (primaryrgb[0] > 230 && primaryrgb[1] > 230 && primaryrgb[2] > 230) ? 1 : 0;
    const secondaryColorCheck = (secondaryrgb[0] > 230 && secondaryrgb[1] > 230 && secondaryrgb[2] > 230) ? 1 : 0;

    const aboutVision = GPT(aboutPrompts.aboutVision.prompt, tagLine);
    const aboutTitle = GPT(aboutPrompts.aboutTitle.prompt, `${companyOverview} ${await aboutVision}`);
    const aboutGPT = NestedGPT(aboutPrompts.aboutGPT.prompt, aboutPrompts.aboutGPT.Refine, `${companyOverview} ${await aboutVision}`);
    const aboutpointsPromise = aboutGPT.then(cleanAndSplit);
    const aboutpoints = await aboutpointsPromise;

    const aboutHeaderDescriptions = await Promise.all(
        aboutpoints.map(async (point) => {
            const { header, description } = separateHeaderDescription(point);
            const finalHeader = header || await GPT(aboutPrompts.aboutPointtsHeader.prompt, description);
            return { header: finalHeader, description };
        })
    );
    const colorF_P75S25 =await GPT(`Background Color ${about.p75s25}`,aboutPrompts.F_SP100.prompt)
    const colorF_P50S50 =await GPT(`Background Color ${about.p50s50}`,aboutPrompts.F_SP100.prompt)
    const colorF_P25S75 =await GPT(`Background Color ${about.p25s75}`,aboutPrompts.F_SP100.prompt)
    console.log(colorF_P25S75)
    const [
        resolvedAboutVision,
        resolvedAboutTitle,
        resolvedAboutGPT,
        colorF_S100Result,
        colorF_P100Result,
        resolvedAboutHeader1,
        resolvedAboutHeader2,
        resolvedAboutHeader3,
        resolvedAboutHeader4,
        resolvedAboutHeader5
    ] = await Promise.all([
        aboutVision,
        aboutTitle,
        aboutGPT,
        colorF_S100,
        colorF_P100,
        ...aboutHeaderDescriptions.map(item => item.header)
    ]);

    const aboutResponse = {
        companyName,
        companyLogo:logo,
        primaryColorR: primaryrgb[0],
        primaryColorG: primaryrgb[1],
        primaryColorB: primaryrgb[2],
        primaryColorCheck: primaryColorCheck,
        secondaryColorR: secondaryrgb[0],
        secondaryColorG: secondaryrgb[1],
        secondaryColorB: secondaryrgb[2],
        secondaryColorCheck: secondaryColorCheck,
        colorP100: primaryColorHex,
        colorP75_S25: about.p75s25,
        colorP50_S50: about.p50s50,
        colorP25_S75: about.p25s75,
        colorS100: secondaryColorHex,
        colorF_S100: colorF_S100Result,
        colorF_P100: colorF_P100Result,
        colorF_P75S25: colorF_P75S25,
        colorF_P50S50: colorF_P50S50,
        colorF_P25S75: colorF_P25S75,
        SCL: "#FFFFFF",
        SCD: "#000000",
        tagLine,
        coverImage: 'freepik',
        aboutTitle: resolvedAboutTitle,
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
