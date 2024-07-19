

/**
 * @param {string} header - The header string to be cleaned.
 * @returns {string} - The cleaned header string.
 */

function cleanHeader(header) {
    header = header.trim();
    header = header.replace(/^[^a-zA-Z]+|[^a-zA-Z]+$/g, '');
    header = header.replace(/\$/g, '');
    return header.replace(/\s+/g, ' ');
}

