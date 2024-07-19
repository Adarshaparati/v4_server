/**
 * @param {string} inputString - The input string containing the header and description.
 * @returns {object} - An object containing the separated header and description.
 */
function separateHeaderDescription(inputString) {
    function removeSymbols(str) {
        return str.replace(/[^a-zA-Z0-9\s-]/g, '');
    }

    inputString = inputString.replace(/^\/\[\]/, '').replace(/\/$/, '');
    const parts = inputString.split(/\s-\s(.+)/);

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


module.exports = separateHeaderDescription;