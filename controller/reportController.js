const Report = require("../model/reportModel");
exports.getReportForCampaign = async (req, res) => {
  try {
    const report = await Report.findOne({
      campaignId: req.params.campaignId,
    }).populate("campaignId");
    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found for this campaign" });
    }
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findOne({ campaignId: req.params.campaignId });
    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found for this campaign" });
    }

    if (req.body.opens) report.opens += 1;
    if (req.body.clicks) report.clicks += 1;

    await report.save();
    res.json(report);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find().populate("campaignId");
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getOpenDetailsByCampaign = async (req, res) => {
  try {
    const report = await Report.findOne({ campaignId: req.params.campaignId });
    if (!report) {
      return res
        .status(404)
        .json({ message: "Report not found for this campaign" });
    }

    const openCounts = report.opens.details.reduce((acc, curr) => {
      acc[curr.recipientId] = (acc[curr.recipientId] || 0) + 1;
      return acc;
    }, {});

    res.json({
      campaignId: report.campaignId,
      totalOpens: report.opens.total,
      openDetails: openCounts,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
