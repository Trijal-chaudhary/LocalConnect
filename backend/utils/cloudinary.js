const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dluw75knc",
  api_key: "628132687229293",
  api_secret: "y7t6rllZZYZ_tiWc4yuyImwqTYE",
});

module.exports = cloudinary;