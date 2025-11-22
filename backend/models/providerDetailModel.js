const mongoose = require('mongoose');

const providerDetails = mongoose.Schema({
  details: {
    type: Object,
    required: true
  },
  urls: {
    type: Array,
    required: true
  },
  status: {
    type: String,
    default: "pending"
  },
  pincodes: {
    type: Array,
    required: true
  },
  clientId: {
    type: String
  },
  PrevClient: {
    type: Array
  },
  review: {
    type : Array
  },
  avgStar:{
    type :Number
  }
})

module.exports = mongoose.model("providerDetails", providerDetails);