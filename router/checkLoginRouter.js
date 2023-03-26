const AuthRouter = require('express').Router()
const AuthController = require("../controllers/auth-controller")


AuthRouter
    .route('/checkLogin')
    .get(AuthController.CheckLogin)



   
    

module.exports=AuthRouter