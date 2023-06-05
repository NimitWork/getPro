const ForgotPasswordRouter = require('express').Router()
const forgotPasswordController = require("../controllers/forgotPassword-controller")


ForgotPasswordRouter
    .route('/password-reset')
    .post(forgotPasswordController.forgetPassword);

module.exports=ForgotPasswordRouter