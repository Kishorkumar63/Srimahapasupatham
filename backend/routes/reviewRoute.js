const express = require("express");
const router = express.Router();
const Review = require("../models/reviewModel");
const nodemailer = require("nodemailer");

// Handle form submission
router.post("/send-review", async (req, res) => {
  try {
    const { name, message } = req.body;

    // Store data in MongoDB
    const data = await Review.create(req.body);

    var transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "kishorkuma4657@gmail.com",
        pass: "zqhs akud fdxs psgl",
      },
    });
    const mailOptions = {
      from: `${name}`,
      to: "Kanalareddy.reddy@gmail.com",
      subject: "New Message Submission",
      text: `\nEmail: ${name}\nMessage:${message}\n\nStored Data:\n${JSON.stringify(
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
