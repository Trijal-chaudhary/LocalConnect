const mongoose = require('mongoose');

const clientDetails = mongoose.Schema({
  details: {
    type: Object,
    required: true
  },
  otp: {
    type: String,
  },
  providerId: {
    type: String
  },
  prevProvider: {
    type: Array
  }
})

module.exports = mongoose.model("clientDetails", clientDetails);