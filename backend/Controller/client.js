// import verification from "../middleware/verification.js";

const { default: transporter } = require('../middleware/nodemailer');
const { default: verification } = require('../middleware/verification');
const clientDetails = require('../models/ClientDetailsModel');
const providerDetails = require('../models/providerDetailModel')
const verificationDetails = require('../models/VerificationModel')



exports.postProviderDetailsClient = async (req, res, next) => {
  const { pin } = req.body;
  if (pin) {
    const provider = await providerDetails.find({ pincodes: pin, status: "Approved" }).sort({ avgStar: -1 });;
    res.status(201).json({ provider });

  } else {
    const provider = await providerDetails.find({ status: "Approved" }).sort({ avgStar: -1 });
    res.status(201).json({ provider });

  }
}
exports.postSignUpClient = async (req, res, next) => {
  // const details = await clientDetails({ details: req.body })
  // await details.save();
  // verificationDetails
  const otp = Math.floor(1000 + Math.random() * 9000);
  console.log(req.body)
  const prevEmail = await verificationDetails.findOne({ email: req.body.email });
  if (prevEmail) {
    prevEmail.otp = otp;
    prevEmail.markModified("otp");
    await prevEmail.save();
  }
  else {
    const veriDetails = await verificationDetails({ email: req.body.email, otp: otp })
    await veriDetails.save();
  }
  verification(req.body.email, otp);
  console.log(req.body.email)
  res.status(201).json({ message: "yes" })
}

exports.postLogInClient = async (req, res, next) => {
  console.log(req.body);
  const details = await clientDetails.findOne({ 'details.username': req.body.userName, "details.password": req.body.password });
  if (details) {
    req.session.isLoggedIn = true;
    req.session.details = details;
    req.session.who = "client"
    res.status(201).json({ message: "found" })
  } else {
    res.status(201).json({ message: "not found" })
  }

}
exports.postIsLoggedClient = async (req, res, next) => {

  if (req.session.isLoggedIn === true && req.session.who === "client") {
    const details = await clientDetails.findOne({ 'details.username': req.session.details.details.username, "details.password": req.session.details.details.password })
    res.status(201).json({ message: "found", details })

  } else {
    res.status(201).json({ message: "not found" })

  }
}
exports.postLogoutClient = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.status(500).json({ isLoggedIn: true, message: "Logout failed on server." });
    }
    res.json({ isLoggedIn: false, message: "Logged out successfully." });
  })
}
exports.postBookClient = async (req, res, next) => {
  const random4Digit = Math.floor(1000 + Math.random() * 9000);
  const provDet = await providerDetails.findOne({ _id: req.body.id })
  provDet.clientId = req.session.details._id;
  provDet.markModified('clientId');
  await provDet.save();
  const userDetails = await clientDetails.findOne({ 'details.username': req.session.details.details.username, "details.password": req.session.details.details.password })
  userDetails.otp = random4Digit;
  userDetails.providerId = req.body.id
  userDetails.markModified('otp');
  userDetails.markModified('providerId');
  await userDetails.save();
  console.log(provDet, userDetails);
  res.status(201).json({ message: "saved" })
}
exports.postCompletedWorkClient = async (req, res, next) => {
  const userDetails = await clientDetails.findOne({ 'details.username': req.session.details.details.username, "details.password": req.session.details.details.password })
  const provDet = await providerDetails.findOne({ _id: userDetails.providerId })
  // console.log(userDetails, provDet)
  provDet.clientId = undefined;
  provDet.markModified("clientId");
  await provDet.save();


  userDetails.otp = undefined;
  userDetails.providerId = undefined;
  userDetails.markModified("otp");
  userDetails.markModified("providerId");
  await userDetails.save();

  if (!provDet.PrevClient) provDet.PrevClient = [];
  if (!userDetails.prevProvider) userDetails.prevProvider = [];
  provDet.PrevClient.push({
    id: userDetails._id,
    bookedAt: new Date()
  });
  provDet.markModified("PrevClient");
  await provDet.save();

  userDetails.prevProvider.push({
    id: provDet._id,
    completedAt: new Date()
  });
  userDetails.markModified("prevProvider");
  await userDetails.save();


  // console.log(provDet, userDetails);
  res.status(201).json({ message: "deleted" })

}
exports.postPreviousProvider = async (req, res, next) => {
  console.log(req.body);
  const userDetail = await providerDetails.findOne({ _id: req.body.id });

  res.status(201).json({ prev: userDetail });
}
exports.postReview = async (req, res, next) => {
  const ProvDetails = await providerDetails.findOne({ _id: req.body.provider })
  const userDetail = await clientDetails.findOne({ _id: req.session.details._id })
  ProvDetails.PrevClient.forEach(ele => {
    if (ele.id.equals(req.session.details._id)) {
      ele.review = true;
    }
  });
  ProvDetails.review.push(
    {
      time: new Date(),
      name: userDetail.details.full_name,
      star: req.body.star,
      review: req.body.review
    }
  )
  if (ProvDetails.avgStar) {
    ProvDetails.avgStar = (Number(ProvDetails.avgStar) + Number(req.body.star)) / 2

  } else {
    ProvDetails.avgStar = req.body.star
  }
  ProvDetails.markModified("review");
  ProvDetails.markModified("PrevClient");
  ProvDetails.markModified("avgStar");
  ProvDetails.save();
  console.log(req.body, ProvDetails, userDetail);
  res.status(201).json({ message: "added review" });

}
exports.postSearch = async (req, res, next) => {
  console.log(req.body)
  const provider = await providerDetails.find({ status: "Approved" }).sort({ avgStar: -1 });
  const searchFor = provider.filter(ele => ele.details.primary_service === req.body.search.toLowerCase())
  // console.log(searchFor)
  res.status(201).json({ searching: searchFor })
}


exports.postClientVerification = async (req, res, next) => {
  const prevEmail = await verificationDetails.findOne({ email: req.body.details.email });
  if (prevEmail.otp === req.body.otp) {
    const details = await clientDetails({ details: req.body.details })
    await details.save();
    res.status(201).json({ message: "match" });
  } else {
    res.status(201).json({ message: "notMatch" });
  }

}