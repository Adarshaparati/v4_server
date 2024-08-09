/**
 * @param {string} header - The header string to be cleaned.
 * @returns {string} - The cleaned header string.
 */
function cleanHeader(header) {
    // Check if the header contains any list indicators after the colon
    const hasListIndicators = /[:]\s*(-|\d+\.|\d+\)|\d+\s)/;

    // If list indicators are found, return the text to the left of the colon
    if (hasListIndicators.test(header)) {
        return header.split(':')[0].trim();
    }

    // Remove list indicators such as numbers followed by a dot
    header = header.replace(/^\d+\.\s*/, '');

    // Otherwise, perform the cleaning process
    // Remove any text left of : including :
    header = header.split(':').pop().trim();
    
    // Remove leading and trailing non-alphabetic and non-numeric characters
    header = header.replace(/^[^a-zA-Z0-9]+|[^a-zA-Z0-9]+$/g, '');
    
    // Remove $ symbols
    header = header.replace(/\$/g, '');
    
    // Replace multiple spaces with a single space
    return header.replace(/\s+/g, ' ');
}

// Testing the function with a sample header
// console.log(cleanHeader("### Slide 1: Bartr Roadmap"));

module.exports = cleanHeader;
