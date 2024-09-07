// src/models/report.model.js
const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  totalSent: {
    type: Number,
    default: 0,
  },
  opens: {
    total: { type: Number, default: 0 },
    details: [
      {
        recipientId: String,
        timestamp: Date,
      },
    ],
  },
  clicks: {
    total: { type: Number, default: 0 },
    details: [
      {
        recipientId: String,
        timestamp: Date,
        url: String,
      },
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Report", reportSchema);
