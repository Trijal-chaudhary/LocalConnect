const multer = require("multer");
const upload = multer();

const express = require('express');
const { postProviderDetailsClient, postSignUpClient, postLogInClient, postIsLoggedClient, postLogoutClient, postBookClient, postCompletedWorkClient, postPreviousProvider, postReview, postSearch } = require('../Controller/client');
const postProviderDetailsClientRouter = express.Router();
const postSignUpClientRouter = express.Router();
const postLogInClientRouter = express.Router();
const postIsLoggedClientRouter = express.Router();
const postLogOutClientRouter = express.Router();
const postBookClientRouter = express.Router();
const postCompletedWorkClientRouter = express.Router();
const postPreviousProviderRouter = express.Router();
const postReviewRouter = express.Router();
const postSearchRouter = express.Router();


postProviderDetailsClientRouter.post('/', postProviderDetailsClient)
postSignUpClientRouter.post('/', upload.none(), postSignUpClient)
postLogInClientRouter.post('/', postLogInClient)
postIsLoggedClientRouter.post('/', postIsLoggedClient)
postLogOutClientRouter.post('/', postLogoutClient)
postBookClientRouter.post('/', postBookClient)
postCompletedWorkClientRouter.post('/', postCompletedWorkClient)
postPreviousProviderRouter.post('/', postPreviousProvider)
postReviewRouter.post('/', postReview)
postSearchRouter.post('/', postSearch)


exports.postProviderDetailsClientRouter = postProviderDetailsClientRouter;
exports.postSignUpClientRouter = postSignUpClientRouter;
exports.postLogInClientRouter = postLogInClientRouter;
exports.postIsLoggedClientRouter = postIsLoggedClientRouter;
exports.postLogOutClientRouter = postLogOutClientRouter;
exports.postBookClientRouter = postBookClientRouter;
exports.postCompletedWorkClientRouter = postCompletedWorkClientRouter;
exports.postPreviousProviderRouter = postPreviousProviderRouter;
exports.postReviewRouter = postReviewRouter;
exports.postSearchRouter = postSearchRouter;