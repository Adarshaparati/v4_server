const FinalSheet = require('../models/FinalSheet');

exports.getHistory = async (req, res) => {
  const userId = req.headers["x-userid"];
  try {
    if (!userId) {
      return res.status(400).json({ error: 'x-userid header is required' });
    }

    const history = await FinalSheet.find({ UserID: userId });

    const jsonData = history.map((row) => ({
      userID: row.UserID,
      submissionID: row.FormID,
      link: row.PresentationURL,
      PPTName: row.pptName,
      Date: row.currentTime,
    }));

    res.json(jsonData);
  } catch (e) {
    console.error("Error fetching history:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
