const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const { dbConnect } = require("./config/dbconnection");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// src/server.js
const campaignRoutes = require("./routes/campaignRoutes");
const emailTemplateRoutes = require("./routes/emailTemplateRoute");
const reportRoutes = require("./routes/reportRoute");
const trackingRoutes = require("./routes/trackingRoute");

app.use("/api/campaigns", campaignRoutes);
app.use("/api/email-templates", emailTemplateRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tracking", trackingRoutes);

const startServer = async () => {
  try {
    await dbConnect();
    app.listen(process.env.PORT, () => {
      console.log(`Your server is running on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
