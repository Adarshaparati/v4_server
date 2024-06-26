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

  // Also split on "- " if it's not preceded by a letter (to handle list items with "- ")
  let finalArray = [];
  pointsArray.forEach(item => {
      finalArray.push(...item.split(/(?<![a-zA-Z])- /));
  });

  return finalArray;
}

text = `1. Partner with academic research institutions and utilize their expertise to accelerate R&D for RNA-powered off-the-shelf cell therapies. Leverage external resources for product development. 2. Establish licensing agreements with pharmaceutical companies to develop combinatorial multi-valent CAR therapies using proprietary synthetic RNA technology. Expand market reach and create additional revenue streams. 3. Form distribution partnerships with medical centers for widespread distribution and administration of universal cell therapies. Ensure accessibility by collaborating with established healthcare providers.`

console.log(cleanAndSplit(text))

module.exports = cleanAndSplit


  