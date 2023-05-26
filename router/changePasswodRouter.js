const changePasswordRouter = require('express').Router()
const changepasswordController = require("../controllers/change-password")


changePasswordRouter
    .route('/changePassword')
    .post(changepasswordController.changePassword)

module.exports=changePasswordRouter