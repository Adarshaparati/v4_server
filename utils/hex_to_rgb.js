function hexToRgb(hex) {

    hex = hex.replace(/^#/, '');
    if (hex.length !== 6) {
      throw new Error('Invalid hex color code');
    }
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
  
    return [r, g, b];
  }
module.exports = hexToRgb
  