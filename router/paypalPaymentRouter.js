const PaypalPaymentRouter = require('express').Router()
const PaypalPaymentController = require("../controllers/paypal-payment-controller")


PaypalPaymentRouter
    .route('/PaypalPayment')
    .post(PaypalPaymentController.PaypalPayment);
PaypalPaymentRouter
    .route('/payplesuccess')
    .post(PaypalPaymentController.PaypalPaymentSuccess);

module.exports=PaypalPaymentRouter