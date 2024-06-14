const { authorize, fetchPresentationHistory, getSheetIdFromUrl } = require("../services/spreadsheet");

exports.getHistory = async (req, res) => {
  const userId = req.headers["x-userid"];
  try {
    const auth = await authorize([process.env.SHEET_SCOPES], process.env.SHEET_TOKEN_PATH);
    const history = await fetchPresentationHistory(auth, userId);
    const jsonData = history.map((row) => ({
      userID: row[0],
      submissionID: row[1],
      link: getSheetIdFromUrl(row[2]),
      PPTName: row[3],
      Date: row[4],
    }));
    res.json(jsonData);
  } catch (e) {
    console.error("Error fetching history:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
