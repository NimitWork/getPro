const getAllUserRouter = require('express').Router()
const getAllUserController = require("../controllers/getAllUser-controller")


getAllUserRouter
    .route('/getAllUser')
    .get(getAllUserController.getAllUser);

module.exports=getAllUserRouter