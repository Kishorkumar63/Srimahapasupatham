const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({

  name: {
    type: String,
    // required: true,
  },
  message: {
    type: String,
    // required: true,
  },
});

const messageData = new mongoose.model("message", messageSchema);
module.exports = messageData;
