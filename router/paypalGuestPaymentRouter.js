const PaypalGuestRouter = require('express').Router()
const PaypalGuestController = require("../controllers/paypal-Guest-Payment")


PaypalGuestRouter
    .route('/PaypalGuestPayment')
    .post(PaypalGuestController.PaypalGuestPayment);
    PaypalGuestRouter
    .route('/PaypalGuestPaymentSuccess')
    .post(PaypalGuestController.PaypalGuestPaymentSuccess);

module.exports=PaypalGuestRouter