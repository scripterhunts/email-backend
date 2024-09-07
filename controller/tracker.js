// src/controllers/tracking.controller.js
const Report = require("../model/reportModel");

exports.trackOpen = async (req, res) => {
  const { campaignId, recipientId } = req.params;

  try {
    await Report.findOneAndUpdate(
      { campaignId },
      {
        $inc: { "opens.total": 1 },
        $push: {
          "opens.details": {
            recipientId,
            timestamp: new Date(),
          },
        },
      },
      { upsert: true }
    );

    // Send a 1x1 transparent GIF
    const img = Buffer.from(
      "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      "base64"
    );
    res.writeHead(200, {
      "Content-Type": "image/gif",
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (error) {
    console.error("Error tracking email open:", error);
    res.status(500).end();
  }
};
