const CouponRouter = require('express').Router()
const couponController = require("../controllers/coupon-controller")


CouponRouter
    .route('/getCoupon')
    .post(couponController.getCoupon)


module.exports=CouponRouter