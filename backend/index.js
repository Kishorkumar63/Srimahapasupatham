const express = require("express");
const cors = require("cors");
const astrology = require("./routes/astrologyRoute");
const Review = require("./routes/reviewRoute");
const connectDatabase = require("./config/databaseConnect");
const app = express();
const dotenv = require("dotenv");
const path = require("path");
const bp = require("body-parser");
const multer = require("multer");

dotenv.config({ path: path.join(__dirname, "./config/config.env") });

// Connect to MongoDB
//connectDatabase();

// Use multer to handle form data
const upload = multer();

// Middleware to parse form data
app.use(upload.none());

app.use(express.json());
app.use(bp.urlencoded({ extended: true }));
app.use(cors());

app.use(astrology);
app.use(Review);

const server=app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT} At ${process.env.NODE_ENV}`);
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
  });
}

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled rejection error");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception error");
  server.close(() => {
    process.exit(1);
  });
});
