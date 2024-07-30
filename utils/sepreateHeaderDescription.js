/**
 * @param {string} inputString - The input string containing the header and description.
 * @returns {object} - An object containing the separated header and description.
 */
function separateHeaderDescription(inputString) {
    function removeSymbols(str) {
        // Allow hyphens within words but remove other unwanted symbols
        return str.replace(/[^a-zA-Z0-9\s-]/g, '');
    }

    // Trim leading and trailing unwanted characters
    inputString = inputString.replace(/^\/\[\]/, '').replace(/\/$/, '');
    
    // Check if the input string contains ": - " or ": "
    const colonDashIndex = inputString.indexOf(': - ');
    const colonDashIndex2 = inputString.indexOf(':- ');
    const colonIndex = inputString.indexOf(': ');
    const colonIndex2 = inputString.indexOf(':');
    let parts;

    if (colonDashIndex !== -1) {
        parts = [inputString.slice(0, colonDashIndex), inputString.slice(colonDashIndex + 4)];
    } else if (colonDashIndex2 !== -1) {
        parts = [inputString.slice(0, colonDashIndex2), inputString.slice(colonDashIndex2 + 3)];
    } else if (colonIndex !== -1) {
        parts = [inputString.slice(0, colonIndex), inputString.slice(colonIndex + 2)];
    }
    else if (colonIndex2 !== -1) {
        parts = [inputString.slice(0, colonIndex2), inputString.slice(colonIndex2 + 1)];
    }
    else {
        parts = inputString.split(/\s-\s(.+)/);
    }

    if (parts.length < 2 || parts[0].trim() === '') {
        return {
            header: '',
            description: removeSymbols(parts.length < 2 ? parts[0].trim() : parts[1].trim())
        };
    }

    const header = removeSymbols(parts[0].trim());
    const description = removeSymbols(parts[1].trim());

    return {
        header: header,
        description: description
    };
}

// Example data
const data = [
    'Customers: Users benefit from the product/service provided, ensuring satisfaction and meeting their needs.',
  'Investors: Provide financial support to the project, contributing to its development and growth.', 
  'Suppliers: Provide necessary materials/resources for the product, ensuring smooth production.',    
  'Regulators: Government agencies oversee compliance/standards, ensuring adherence to regulations.'
  ];

// Processing each line
const results = data.map(line => separateHeaderDescription(line));

// Displaying the results
results.forEach(result => console.log(result));

module.exports = separateHeaderDescription;
