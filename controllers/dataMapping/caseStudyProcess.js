const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');

async function processCaseStudy(submission,prompts) {


    const {companyDetails } = submission;
    const { companyOverview } = companyDetails;

    const {caseStudiesPrompts} = prompts

    const caseStudyTitle = await GPT(caseStudiesPrompts.caseStudyTitle.prompt,companyOverview)
    const caseStudy = await GPT(caseStudiesPrompts.caseStudy.prompt,companyOverview)

    const challenges = await NestedGPT(caseStudiesPrompts.challenges.prompt,caseStudiesPrompts.challenges.Refine,companyOverview)
    const Refinedchallenges = await GPT(caseStudiesPrompts.challenges.Refine2,challenges)

    const solution = await NestedGPT(caseStudiesPrompts.solution.prompt,caseStudiesPrompts.solution.Refine,companyOverview)
    const Refinedsolution = await GPT(caseStudiesPrompts.solution.Refine2,solution)

    const outcome = await NestedGPT(caseStudiesPrompts.outcome.prompt,caseStudiesPrompts.outcome.Refine,companyOverview)
    const Refinedoutcome = await GPT(caseStudiesPrompts.outcome.Refine2,outcome)

    const caseStudyResponse = {
        caseStudyTitle: caseStudyTitle,
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
