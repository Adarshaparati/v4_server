/**
 * @param {string} inputString - The input string to be split based on " - ".
 * @returns {Array<string>} - An array of strings split based on " - ".
 */
function splitOnDash(inputString) {
    const parts = inputString.split(' - ');
    return parts.map(part => part.trim());
}

// const data = [
//     'Lack of acceptance and adoption of AI technology in sales engagement - Inefficient or inadequate current sales processes hindering productivity - Difficulty in accurately forecasting customer sentiment and propensity - Limited availability of real-time sales rep coaching and support - Challenges in automating follow-up communications effectively - More advanced and personalized sales pitches needed to stand out'
//   ];

// // Processing each line
// const results = data.map(line => splitOnDash(line));

// // Displaying the results
// results.forEach(result => console.log(result));

module.exports = splitOnDash;