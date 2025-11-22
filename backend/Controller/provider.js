const cloudinary = require("../utils/cloudinary");
const providerDetails = require('../models/providerDetailModel')
const clientDetails = require('../models/ClientDetailsModel');

const fs = require("fs");

exports.postSignUpProv = async (req, res, next) => {
  try {
    const urls = [];
    for (const file of req.files) {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "localconnect/providers",
      });

      urls.push({
        fieldName: file.fieldname,
        url: uploadResult.secure_url
      });
      fs.unlinkSync(file.path);

    }
    const pincodeArray = req.body.service_area
      .split(',') // Splits "201304,201305,201306" into ["201304", "201305", "201306"]
      .map(pincode => pincode.trim()) // Removes any extra spaces
      .filter(pincode => pincode.length > 0)
    const providerDetail = new providerDetails({ details: req.body, urls, pincodes: pincodeArray });
    await providerDetail.save();
    res.status(201).json({ success: true });

  } catch {
    // fs.unlinkSync(file.path);
    res.status(500);

  }

  res.status(201);
}
exports.postLoginProvider = async (req, res, next) => {
  console.log(req.body);
  const details = await providerDetails.findOne({ 'details.username': req.body.userName, "details.password": req.body.password });
  if (details) {
    req.session.isLoggedIn = true;
    req.session.details = details;
    req.session.who = "provider"
    res.status(201).json({ message: "found" })
  } else {
    res.status(201).json({ message: "not found" })
  }

}
exports.postIsLogged = async (req, res, next) => {
  if (req.session.isLoggedIn && req.session.who === "provider") {
    const ProviderDetails = await providerDetails.findOne({ _id: req.session.details._id })
    if (ProviderDetails.clientId) {
      console.log(ProviderDetails.clientId)
      const userDetail = await clientDetails.findOne({ _id: ProviderDetails.clientId })
      // console.log(userDetail)
      res.status(201).json({ isLogged: true, userDetail: ProviderDetails, detailOfUser: userDetail })

    } else {
      res.status(201).json({ isLogged: true, userDetail: ProviderDetails })

    }
    // console.log(ProviderDetails)
  }
  else {
    res.status(201).json({ isLogged: false })
  }
}
exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.status(500).json({ isLoggedIn: true, message: "Logout failed on server." });
    }
    res.json({ isLoggedIn: false, message: "Logged out successfully." });
  })
}
exports.postVerfyOtp = async (req, res, next) => {
  const ProviderDetails = await providerDetails.findOne({ _id: req.session.details._id });
  if (ProviderDetails.clientId) {
    console.log(ProviderDetails.clientId)
    const userDetail = await clientDetails.findOne({ _id: ProviderDetails.clientId })
    userDetail.otp = 'Started'
    userDetail.markModified('otp');
    userDetail.save();
    console.log(userDetail);
  }
  // console.log(req.body);
  res.status(201).json({ message: "Started" });
}
exports.postCompleteProvider = async (req, res, next) => {
  const ProviderDetails = await providerDetails.findOne({ _id: req.session.details._id });
  if (ProviderDetails.clientId) {
    // console.log(ProviderDetails.clientId)
    const userDetail = await clientDetails.findOne({ _id: ProviderDetails.clientId })
    userDetail.otp = 'Complete'
    userDetail.markModified('otp');
    userDetail.save();
    console.log(userDetail);
  }
  // console.log(req.body);
  res.status(201).json({ message: "Complete" });
}

exports.postPreviousClientProvider = async (req, res, next) => {
  console.log(req.body);
  const userDetail = await clientDetails.findOne({ _id: req.body.id });

  res.status(201).json({ prev: userDetail });
}