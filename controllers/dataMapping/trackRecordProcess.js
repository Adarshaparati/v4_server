const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processTrackRecord(submission,prompts) {
    const {trackRecordPrompts} = prompts;
    const {trackRecord} = submission;
    const phaseTimeline1 = `${trackRecord.trackRecord[0]?.year1} - ${trackRecord.trackRecord[0]?.year2}`
    const phaseTimeline2 = `${trackRecord.trackRecord[1]?.year1} - ${trackRecord.trackRecord[1]?.year2}`
    const phaseTimeline3 = `${trackRecord.trackRecord[2]?.year1} - ${trackRecord.trackRecord[2]?.year2}`
    


 // Run the GPT calls concurrently using Promise.all
const [
    tractionPhaseDescription1,
    tractionPhaseDescription2,
    tractionPhaseDescription3
] = await Promise.all([
    GPT(trackRecordPrompts.tractionPhaseDescription1.Refine, trackRecord.trackRecord[0]?.TR),
    GPT(trackRecordPrompts.tractionPhaseDescription2.Refine, trackRecord.trackRecord[1]?.TR),
    GPT(trackRecordPrompts.tractionPhaseDescription3.Refine, trackRecord.trackRecord[3]?.TR)
]);

// Run the subsequent GPT calls concurrently using Promise.all
const [
    trackRecordHeader1,
    trackRecordHeader2,
    trackRecordHeader3
] = await Promise.all([
    GPT(trackRecordPrompts.tractionPhaseHeader.prompt, tractionPhaseDescription1),
    GPT(trackRecordPrompts.tractionPhaseHeader.prompt, tractionPhaseDescription2),
    GPT(trackRecordPrompts.tractionPhaseHeader.prompt, tractionPhaseDescription3)
]);
const trackRecordTitle = await GPT(trackRecordPrompts.trackRecordTitle.prompt,`${tractionPhaseDescription1} ${tractionPhaseDescription2} ${tractionPhaseDescription3}`)
    const trackRecordResponse = {
        trackRecordTitle: trackRecordTitle,            // Title for the track record section
        phaseTimeline1: phaseTimeline1,              // Details of the first phase timeline
        phaseTimeline2: phaseTimeline2,              // Details of the second phase timeline
        phaseTimeline3: phaseTimeline3,              // Details of the third phase timeline
        tractionPhaseHeader1: trackRecordHeader1,        // Header for the first traction phase
        tractionPhaseHeader2: trackRecordHeader2,        // Header for the second traction phase
        tractionPhaseHeader3: trackRecordHeader3,        // Header for the third traction phase
        tractionPhaseDescription1: tractionPhaseDescription1,   // Description for the first traction phase
        tractionPhaseDescription2: tractionPhaseDescription2,   // Description for the second traction phase
        tractionPhaseDescription3: tractionPhaseDescription3    // Description for the third traction phase
    };

    return trackRecordResponse;
}

module.exports = processTrackRecord;
