// src/routes/campaign.routes.js
const express = require("express");
const router = express.Router();
const campaignController = require("../controller/campaignController");

router.get("/", campaignController.getAllCampaigns);
router.post("/", campaignController.createCampaign);
router.get(
  "/:id",
  campaignController.getCampaignMiddleware,
  campaignController.getCampaign
);
router.put(
  "/:id",
  campaignController.getCampaignMiddleware,
  campaignController.updateCampaign
);
router.delete(
  "/:id",
  campaignController.getCampaignMiddleware,
  campaignController.deleteCampaign
);
router.post(
  "/:id/send",
  campaignController.getCampaignMiddleware,
  campaignController.sendCampaign
);

module.exports = router;
