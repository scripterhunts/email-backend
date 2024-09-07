require("dotenv").config();

// src/services/email.service.js
const nodemailer = require("nodemailer");

const EMAIL_HOST = process.env.MAIL_HOST;
const EMAIL_PORT = 587;
const EMAIL_USER = process.env.MAIL_USER;
const EMAIL_PASS = process.env.MAIL_PASS;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

exports.sendEmail = async (
  to,
  subject,
  htmlContent,
  recipientData,
  campaignId
) => {
  const { name, id: recipientId } = recipientData;

  // Replace placeholders in the HTML content
  let personalizedContent = htmlContent.replace(/\${NAME}/g, name);

  // Add tracking pixel
  const trackingPixel = `<img src="${process.env.API_URL}/api/tracking/${campaignId}/${recipientId}" width="1" height="1" />`;
  personalizedContent += trackingPixel;

  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html: personalizedContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
