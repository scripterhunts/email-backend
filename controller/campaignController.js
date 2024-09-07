// src/controllers/campaign.controller.js
const Campaign = require("../model/campaignModel");
const EmailTemplate = require("../model/emailTemplateModel"); // We'll create this next
const emailService = require("../mail/mailSender"); // We'll create this later

exports.getAllCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find().populate("templateId");
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createCampaign = async (req, res) => {
  const campaign = new Campaign({
    name: req.body.name,
    subject: req.body.subject,
    templateId: req.body.templateId,
    scheduledDate: req.body.scheduledDate,
  });

  try {
    const newCampaign = await campaign.save();
    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getCampaign = async (req, res) => {
  res.json(res.campaign);
};

exports.updateCampaign = async (req, res) => {
  if (req.body.name != null) {
    res.campaign.name = req.body.name;
  }
  if (req.body.subject != null) {
    res.campaign.subject = req.body.subject;
  }
  if (req.body.templateId != null) {
    res.campaign.templateId = req.body.templateId;
  }
  if (req.body.status != null) {
    res.campaign.status = req.body.status;
  }
  if (req.body.scheduledDate != null) {
    res.campaign.scheduledDate = req.body.scheduledDate;
  }

  try {
    const updatedCampaign = await res.campaign.save();
    res.json(updatedCampaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCampaign = async (req, res) => {
  try {
    await res.campaign.remove();
    res.json({ message: "Campaign deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.sendCampaign = async (req, res) => {
  const { recipients } = req.body;
  const campaign = res.campaign;
  const template = await EmailTemplate.findById(campaign.templateId);

  if (!template) {
    return res.status(404).json({ message: "Email template not found" });
  }

  try {
    for (let recipient of recipients) {
      await emailService.sendEmail(
        recipient.email,
        campaign.subject,
        template.content,
        recipient
      );
    }
    campaign.status = "completed";
    await campaign.save();
    res.json({ message: "Campaign sent successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCampaignMiddleware = async (req, res, next) => {
  let campaign;
  try {
    campaign = await Campaign.findById(req.params.id);
    if (campaign == null) {
      return res.status(404).json({ message: "Cannot find campaign" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.campaign = campaign;
  next();
};
