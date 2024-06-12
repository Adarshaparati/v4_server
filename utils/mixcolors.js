function mixColors(primaryHex, secondaryHex, x, y) {
    if (x + y !== 100) {
        throw new Error("The sum of x and y must be 100");
    }

    // Convert hex to RGB
    function hexToRgb(hex) {
        hex = hex.replace('#', '');
        let bigint = parseInt(hex, 16);
        return {
            r: (bigint >> 16) & 255,
            g: (bigint >> 8) & 255,
            b: bigint & 255
        };
    }

    // Convert RGB to hex
    function rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }

    // Mix the color components
    function mixComponent(primaryComp, secondaryComp, x, y) {
        return Math.round((primaryComp * x + secondaryComp * y) / 100);
    }

    let primaryRgb = hexToRgb(primaryHex);
    let secondaryRgb = hexToRgb(secondaryHex);

    let mixedRgb = {
        r: mixComponent(primaryRgb.r, secondaryRgb.r, x, y),
        g: mixComponent(primaryRgb.g, secondaryRgb.g, x, y),
        b: mixComponent(primaryRgb.b, secondaryRgb.b, x, y)
    };

    return rgbToHex(mixedRgb.r, mixedRgb.g, mixedRgb.b);
}

module.exports = mixColors
