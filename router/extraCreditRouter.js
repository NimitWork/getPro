const CouponRouter = require('express').Router()
const extraCreditController = require("../controllers/extra-credit-controller")


CouponRouter
    .route('/getextracredit')
    .get(extraCreditController.getExtraCredit)


module.exports=CouponRouter