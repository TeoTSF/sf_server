const { login, getMe, resetPaswwordMail, updatePassword, 
    requestEmailVerification, verifyEmail, handleSaveForm, handleGetUsers } = require('../controllers/system.controllers');
const express = require('express');
const verifyJWT = require('../middlewares/auth.middleware');

const systemRouter = express.Router();

systemRouter.route("/login")
    .post(login)

systemRouter.route("/me")
    .get(verifyJWT, getMe)

systemRouter.route("/reset_password")
    .post(resetPaswwordMail)

systemRouter.route("/update_password")
    .post(updatePassword)

systemRouter.route("/verify_email")
    .post(requestEmailVerification)

systemRouter.route("/send_form")
    .post(handleSaveForm)

systemRouter.route("/get_registre")
    .get(handleGetUsers)

systemRouter.route("/verify_email/:token")
    .get(verifyEmail)



module.exports = systemRouter;