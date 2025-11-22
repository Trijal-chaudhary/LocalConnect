const express = require('express');
const { postLogInAdmin, postIsloggedAdmin, postLogoutAdmin, getPendingProfiles, postProviderDetails, postRejectedAdmin, postApprovedAdmin, getApprovedProfiles, getRejectedProfiles } = require('../Controller/admin');

const getLogInAdminRouter = express.Router();
const postIsloggedAdminRouter = express.Router();
const postLogOutAdminRouter = express.Router();
const getPendingProfilesRouter = express.Router();
const postProvederDetailsAdminRouter = express.Router();
const postRejectedRouter = express.Router();
const postApprovedRouter = express.Router();
const getApprovedProfilesRouter = express.Router();
const getRejectedProfilesRouter = express.Router();


getLogInAdminRouter.post("/", postLogInAdmin);
postIsloggedAdminRouter.post('/', postIsloggedAdmin)
postLogOutAdminRouter.post("/", postLogoutAdmin)
getPendingProfilesRouter.get('/', getPendingProfiles)
postProvederDetailsAdminRouter.post('/', postProviderDetails)
postRejectedRouter.post('/', postRejectedAdmin);
postApprovedRouter.post('/', postApprovedAdmin)
getApprovedProfilesRouter.get('/', getApprovedProfiles)
getRejectedProfilesRouter.get("/", getRejectedProfiles)

exports.getLogInAdminRouter = getLogInAdminRouter;
exports.postIsloggedAdminRouter = postIsloggedAdminRouter;
exports.postLogOutAdminRouter = postLogOutAdminRouter;
exports.getPendingProfilesRouter = getPendingProfilesRouter;
exports.postProvederDetailsAdminRouter = postProvederDetailsAdminRouter;
exports.postRejectedRouter = postRejectedRouter;
exports.postApprovedRouter = postApprovedRouter;
exports.getApprovedProfilesRouter = getApprovedProfilesRouter;
exports.getRejectedProfilesRouter = getRejectedProfilesRouter