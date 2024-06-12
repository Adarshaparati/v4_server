function cleanAndSplit(text) {
  // Remove multiple newlines
  let cleanedText = text.replace(/\n\n/g, '\n')
                        .replace(/\n\s+\n/g, '\n');

  // Trim whitespace from the beginning and end of the text
  cleanedText = cleanedText.trim();

  // Remove leading numeric patterns like "1. " or "1- " from each line
  cleanedText = cleanedText.replace(/(^|\n|\r)(\d+\.\s*|\d+-\s*)/g, '$1');

  // Split the cleaned text into an array based on the pattern "digit. " or "- " only at the start of lines
  const pointsArray = cleanedText.split(/(?=\d+\.\s)|(?<=\n)-\s/).map(point => {
      // Remove leading digit and ". ", and also handle leading "- "
      return point.replace(/^\d+\.\s*/, '').trim().replace(/^- /, '');
  });

  // Also split on "- " if it's not preceded by a letter (to handle list items with "- ")
  let finalArray = [];
  pointsArray.forEach(item => {
      finalArray.push(...item.split(/(?<![a-zA-Z])- /));
  });

  return finalArray;
}


  
module.exports = cleanAndSplit
  