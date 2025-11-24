const mongoose = require('mongoose');

const verificationDetails = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  otp: {
    type: String
  }
})

module.exports = mongoose.model("verificationDetails", verificationDetails)