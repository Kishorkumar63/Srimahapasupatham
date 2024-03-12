const express = require("express");
const router = express.Router();
const AstrologyData = require("../models/astrologyModel");
const nodemailer = require("nodemailer");

// Handle form submission
router.post("/send-message", async (req, res) => {
  try {
    const { DOB, TOB, POB, number, name, email, message } = req.body;

  
  const data=await AstrologyData.create(req.body)

    var transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
      auth: {
        user: "kishorkuma4657@gmail.com",
        pass: "zqhs akud fdxs psgl",
      },
    });
    const mailOptions = {
      from: `${email}`,
      to: "Kanalareddy.reddy@gmail.com",
      subject: "New Message Submission",
      text: `\nEmail: ${email}\nMessage:${message}\n\nStored Data:\n${JSON.stringify(
        req.body.toObject(),
        null,
        2
      )}`,
    };
    await transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("submitted");
      }
    });

    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Error sending message" });
  }
});

module.exports = router;
