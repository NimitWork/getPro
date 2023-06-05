const userRouter = require('express').Router()
const userController = require("../controllers/user-controller")

// const checkLoginUser = (req, res, next) => {
//     if (req.cookies.userLoginToken === undefined) {
//        res.json({
//         message:"you are not loged in"
//        })
//     } else {
//         next()
//     }
// }










module.exports = userRouter;
