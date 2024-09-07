// src/routes/tracking.routes.js
const express = require("express");
const router = express.Router();
const trackingController = require("../controller/tracker");

router.get("/:campaignId/:recipientId", trackingController.trackOpen);

module.exports = router;
