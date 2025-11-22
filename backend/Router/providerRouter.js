const express = require('express');
const multer = require('multer');

const { postSignUpProv, postLoginProvider, postIsLogged, postLogout, postVerfyOtp, postCompleteProvider, postPreviousClientProvider } = require('../Controller/provider');
// const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {

    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const upload = multer({ storage: storage })


const postSignUpprovRouter = express.Router();
const postLogInProviderRouter = express.Router();
const postIsLoggedRouter = express.Router();
const postLogOutRouter = express.Router();
const postVerfyOtpRouter = express.Router();
const postCompleteProviderRouter = express.Router();
const postPreviousClientProviderRouter = express.Router();


postSignUpprovRouter.post('/', upload.any(), postSignUpProv);
postLogInProviderRouter.post('/', postLoginProvider);
postIsLoggedRouter.post('/', postIsLogged)
postLogOutRouter.post('/', postLogout)
postVerfyOtpRouter.post('/', postVerfyOtp);
postCompleteProviderRouter.post('/', postCompleteProvider)
postPreviousClientProviderRouter.post('/', postPreviousClientProvider)


exports.postSignUpprovRouter = postSignUpprovRouter;
exports.postLogInProviderRouter = postLogInProviderRouter;
exports.postIsLoggedRouter = postIsLoggedRouter;
exports.postLogOutRouter = postLogOutRouter;
exports.postVerfyOtpRouter = postVerfyOtpRouter;
exports.postCompleteProviderRouter = postCompleteProviderRouter;
exports.postPreviousClientProviderRouter = postPreviousClientProviderRouter;