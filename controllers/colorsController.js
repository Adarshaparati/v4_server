const getColors = require("../services/colors");

exports.postGetColors = async (req, res) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    const colors = await getColors(imageUrl);
    res.json(colors);
  } catch (error) {
    console.error("Error fetching colors:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
