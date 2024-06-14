const axios = require("axios");
const sharp = require("sharp");

/**
 * Extract colors from an image URL using sharp.
 * 
 * @param {string} imageUrl - URL of the image to process.
 * @returns {Promise<Array>} - A promise that resolves with an array of colors and their percentages.
 */
async function getColors(imageUrl) {
  try {
    // Fetch the image as a buffer
    const response = await axios({
      url: imageUrl,
      responseType: "arraybuffer",
    });
    const imageBuffer = Buffer.from(response.data, "binary");

    // Use sharp to process the image
    const { data, info } = await sharp(imageBuffer).raw().toBuffer({ resolveWithObject: true });

    // Process the raw pixel data to extract colors
    const colors = extractColors(data, info);

    // Sort colors by percentage in descending order
    colors.sort((a, b) => b.percentage - a.percentage);

    // Ensure at least five colors are returned
    return fillDefaultColors(colors);
  } catch (error) {
    throw new Error(`Error processing image: ${error.message}`);
  }
}

/**
 * Extract colors from raw pixel data.
 * 
 * @param {Buffer} data - Raw pixel data from the image.
 * @param {Object} info - Info object from sharp containing image details.
 * @returns {Array} - An array of color objects with their percentages.
 */
function extractColors(data, info) {
  const { width, height, channels } = info;
  const colors = new Map();
  let totalPixels = 0;

  // Helper function to determine if two colors are similar
  function isSimilar(color1, color2) {
    const threshold = 50; // Adjust this threshold based on your requirements
    const [r1, g1, b1] = color1;
    const [r2, g2, b2] = color2;
    return Math.abs(r1 - r2) < threshold && Math.abs(g1 - g2) < threshold && Math.abs(b1 - b2) < threshold;
  }

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * channels;
      const [r, g, b, a] = [data[idx], data[idx + 1], data[idx + 2], data[idx + 3]];
      
      // Ignore fully transparent pixels
      if (channels === 4 && a === 0) {
        continue;
      }

      totalPixels++;

      let foundSimilarColor = false;
      const currentColor = [r, g, b];

      // Check if the current color is similar to any existing color in the map
      for (const [hex, color] of colors) {
        if (isSimilar(currentColor, color.rgb)) {
          // If similar color found, increment the count of the existing color
          color.count++;
          foundSimilarColor = true;
          break;
        }
      }

      // If no similar color found, add the current color to the map
      if (!foundSimilarColor) {
        const hex = rgbToHex(r, g, b);
        colors.set(hex, { hex, rgb: currentColor, count: 1 });
      }
    }
  }

  // Sort colors by count in descending order
  const sortedColors = Array.from(colors.values()).sort((a, b) => b.count - a.count);

  // Calculate the percentage of each color
  return sortedColors.map(color => {
    color.percentage = ((color.count / totalPixels) * 100).toFixed(2);
    return color;
  });
}

/**
 * Convert RGB values to a hex color string.
 * 
 * @param {number} r - Red value.
 * @param {number} g - Green value.
 * @param {number} b - Blue value.
 * @returns {string} - Hex color string.
 */
function rgbToHex(r, g, b) {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

/**
 * Fill the colors array with default colors if fewer than five colors are found.
 * 
 * @param {Array} colors - Array of colors extracted from the image.
 * @returns {Array} - Array of five colors.
 */
function fillDefaultColors(colors) {
  const lightGray = { hex: "#E6E6E6", rgb: [230, 230, 230], percentage: "0.00" };

  // Check if the first color has RGB values all greater than 230
  if (colors.length > 0 && colors[0].rgb.every(value => value > 230)) {
    colors[0] = lightGray;
  }

  // Check if the second color has RGB values all greater than 230
  if (colors.length > 1 && colors[1].rgb.every(value => value > 230)) {
    colors[1] = lightGray;
  }

  while (colors.length < 5) {
    if (colors.length === 1) {
      colors.push(lightGray);
    } else if (colors.length > 1) {
      const color1 = colors[0].rgb;
      const color2 = colors[1].rgb;

      if (colors.length === 2) {
        colors.push(generateMixedColor(color1, color2, 0.5));
      } else if (colors.length === 3) {
        colors.push(generateMixedColor(color1, color2, 0.75));
      } else if (colors.length === 4) {
        colors.push(generateMixedColor(color1, color2, 0.25));
      }
    }
  }

  return colors;
}

/**
 * Generate a mixed color based on the specified ratio.
 * 
 * @param {Array} color1 - RGB array of the first color.
 * @param {Array} color2 - RGB array of the second color.
 * @param {number} ratio - Mixing ratio of the first color.
 * @returns {Object} - Mixed color object.
 */
function generateMixedColor(color1, color2, ratio) {
  const mix = (c1, c2, r) => Math.round(c1 * r + c2 * (1 - r));
  const r = mix(color1[0], color2[0], ratio);
  const g = mix(color1[1], color2[1], ratio);
  const b = mix(color1[2], color2[2], ratio);
  const hex = rgbToHex(r, g, b);
  return { hex, rgb: [r, g, b], percentage: "0.00" };
}

module.exports = getColors;