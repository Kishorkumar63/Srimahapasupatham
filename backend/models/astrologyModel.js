const mongoose = require("mongoose");

const astrologySchema = new mongoose.Schema({
  DOB: {
    type: String,
    // required: true,
  },
  TOB: {
    type: String,
    //required: true,
  },
  POB: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  number: {
    type: Number,
    // required: true,
  },
  message: {
    type: String,
    // required: true,
  },
});

const astData = new mongoose.model("astrology", astrologySchema);
module.exports = astData;
