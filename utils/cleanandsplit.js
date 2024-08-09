const splitOnDash = require('./dashSplit')
function cleanAndSplit(text) {
  // Remove multiple newlines
  let cleanedText = text.replace(/\n\n/g, '\n')
                        .replace(/\n\s+\n/g, '\n');
  // Trim whitespace from the beginning and end of the text
  cleanedText = cleanedText.trim();
// Find the position where the list starts (either with "1." or "-")
let listStartIndex = cleanedText.search(/(\d+\.\s)|(-\s)/);
if (listStartIndex === -1) {
// If no list is found, return the cleaned text as a single element array
return [cleanedText];
}
// Trim the text to start from the first list item
cleanedText = cleanedText.substring(listStartIndex);
  // Remove leading numeric patterns like "1. " or "1- " from each line
  cleanedText = cleanedText.replace(/(^|\n|\r)(\d+\.\s*|\d+-\s*)/g, '$1');
  // Split the cleaned text into an array based on the pattern "digit. " or "- " only at the start of lines
  const pointsArray = cleanedText.split(/(?=\d+\.\s)|(?<=\n)-\s/).map(point => {
      // Remove leading digit and ". ", and also handle leading "- "
      return point.replace(/^\d+\.\s*/, '').trim().replace(/^- /, '');
  });
  let finalArray = [];

  finalArray = pointsArray.length == 1?splitOnDash(pointsArray[0]):pointsArray;
  // const result = finalArray.length === 1 
  // ? finalArray[0].split('.').map(sentence => sentence.trim()).filter(sentence => sentence.length > 0) 
  // : finalArray;

return finalArray;
}

module.exports = cleanAndSplit
