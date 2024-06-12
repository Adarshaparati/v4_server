function extractNumbers(inputString) {
    // Regular expression to match numbers after a colon and optional whitespace
    const regex = /:\s*(\d+)/g;
    let matches;
    const numbers = [];

    // Use regex to find all matches
    while ((matches = regex.exec(inputString)) !== null) {
        // Add the matched number to the array, converted to integer
        numbers.push(parseInt(matches[1], 10));
    }

    return numbers;
}

module.exports  = extractNumbers
