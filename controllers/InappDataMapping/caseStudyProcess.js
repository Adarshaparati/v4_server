const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const cleanHeader = require('../../utils/cleanHeader')

async function processCaseStudy(submission, prompts,response) {


    const {caseStudies} = submission;
    const {caseStudiesPrompts} = prompts

    const caseStudyTitle = await GPT(caseStudiesPrompts.caseStudyTitle.prompt,`User Response: ${caseStudies.caseStudies} Existing Response: ${response.caseStudies.caseStudyTitle}`)
    const caseStudy = await GPT(caseStudiesPrompts.caseStudy.prompt,`User Response: ${caseStudies.caseStudies} Existing Response: ${response.caseStudies.caseStudy}`)

    const challenges = await GPT(caseStudiesPrompts.challenges.prompt,caseStudiesPrompts.challenges.Refine,caseStudies.caseStudies)
    const Refinedchallenges = await GPT(caseStudiesPrompts.challenges.Refine2,challenges)

    const solution = await NestedGPT(caseStudiesPrompts.solution.prompt,caseStudiesPrompts.solution.Refine,caseStudies.caseStudies)
    const Refinedsolution = await GPT(caseStudiesPrompts.solution.Refine2,solution)

    const outcome = await NestedGPT(caseStudiesPrompts.outcome.prompt,caseStudiesPrompts.outcome.Refine,caseStudies.caseStudies)
    const Refinedoutcome = await GPT(caseStudiesPrompts.outcome.Refine2,outcome)

    const caseStudyResponse = {
        caseStudyTitle: cleanHeader(caseStudyTitle),
        caseStudy: caseStudy,
        challenges: Refinedchallenges,
        solution: Refinedsolution,
        outcome: Refinedoutcome,
        caseStudyCoverImage: ""
    };
    console.log('caseStudy...')
    return caseStudyResponse;
}

module.exports = processCaseStudy;
