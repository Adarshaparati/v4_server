function calculateSOM(competitiveness, value) {
    if (value === null || value === undefined || value === "") {
        return "";
    }

    let percentage;
    switch (competitiveness.toLowerCase()) {
        case "high competition":
            percentage = 0.01;
            break;
        case "moderate competition":
            percentage = 0.02;
            break;
        case "low competition":
            percentage = 0.05;
            break;
        case "no competition":
            percentage = 0.10;
            break;
        default:
            return "";
    }

    return Math.round(percentage * value);
}

module.exports = calculateSOM
