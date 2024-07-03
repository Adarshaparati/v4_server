const { GPT, NestedGPT } = require('../../services/gpt');
const cleanAndSplit = require('../../utils/cleanandsplit');
const separateHeaderDescription = require('../../utils/sepreateHeaderDescription');

async function processTrackRecord(submission,prompts) {
    const {trackRecordPrompts} = prompts;
    const {trackRecord} = submission;
    const phaseTimeline1 = `${trackRecord[0]?.year1} - ${trackRecord[0]?.year2}`
    const phaseTimeline2 = `${trackRecord[1]?.year1} - ${trackRecord[1]?.year2}`
    const phaseTimeline3 = `${trackRecord[2]?.year1} - ${trackRecord[2]?.year2}`

    const trackRecordTitle = GPT(trackRecordPrompts.trackRecordTitle.prompt)
    const trackRecordResponse = {
        trackRecordTitle: "",            // Title for the track record section
        phaseTimeline1: phaseTimeline1,              // Details of the first phase timeline
        phaseTimeline2: phaseTimeline2,              // Details of the second phase timeline
        phaseTimeline3: phaseTimeline3,              // Details of the third phase timeline
        tractionPhaseHeader1: "",        // Header for the first traction phase
        tractionPhaseHeader2: "",        // Header for the second traction phase
        tractionPhaseHeader3: "",        // Header for the third traction phase
        tractionPhaseDescription1: "",   // Description for the first traction phase
        tractionPhaseDescription2: "",   // Description for the second traction phase
        tractionPhaseDescription3: ""    // Description for the third traction phase
    };

    return trackRecordResponse;
}

module.exports = processTrackRecord;
