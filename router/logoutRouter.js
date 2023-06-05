const logoutRouter = require('express').Router()
const logoutController = require("../controllers/logout-controller")


logoutRouter
    .route('/userLogout')
    .get(logoutController.userLogout);

module.exports=logoutRouter