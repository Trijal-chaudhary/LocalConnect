const providerDetails = require('../models/providerDetailModel')


exports.postLogInAdmin = (req, res, next) => {
  const { username, password } = req.body;
  if (username === "Trijal05" && password === "846004") {
    req.session.isLoggedIn = true;
    req.session.who = "admin"
    res.status(201).json({ user: "found" });

  } else {
    res.status(201).json({ user: "notFound" });

  }
}
exports.postIsloggedAdmin = (req, res, next) => {
  if (req.session.isLoggedIn === true && req.session.who === "admin") {
    res.status(201).json({ user: "found" });
  } else {
    res.status(201).json({ user: "notFound" });
  }
}
exports.postLogoutAdmin = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      console.log('Error destroying session:', err);
      return res.status(500).json({ isLoggedIn: true, message: "Logout failed on server." });
    }
    res.json({ isLoggedIn: false, message: "Logged out successfully." });
  })
}
exports.getPendingProfiles = async (req, res, next) => {
  const details = await providerDetails.find({ status: "pending" });
  console.log(details);
  res.status(201).json({ pendingDetails: details });
}
exports.getApprovedProfiles = async (req, res, next) => {
  const details = await providerDetails.find({ status: "Approved" });
  console.log(details);
  res.status(201).json({ pendingDetails: details });
}
exports.getRejectedProfiles = async (req, res, next) => {
  const details = await providerDetails.find({ status: "Rejected" });
  console.log(details);
  res.status(201).json({ pendingDetails: details });
}
exports.postProviderDetails = async (req, res, next) => {
  const details = await providerDetails.findOne({ _id: req.body.id })
  // console.log(req.body, details);
  res.status(201).json({ details });
}

exports.postRejectedAdmin = async (req, res, next) => {
  const details = await providerDetails.findOne({ _id: req.body.id });
  details.status = "Rejected";
  details.markModified('status');
  await details.save()

  res.status(201).json({ message: "Rejected" });

}
exports.postApprovedAdmin = async (req, res, next) => {
  const details = await providerDetails.findOne({ _id: req.body.id });
  details.status = "Approved";
  details.markModified('status');
  await details.save()
  res.status(201).json({ message: "Approved" });

}