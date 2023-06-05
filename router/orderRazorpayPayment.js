const orderRazorpayRouter = require("express").Router();
const orderRazorpayController = require("../controllers/order-razorpay-payment");

orderRazorpayRouter
  .route("/orderRazorpay")
  .post(orderRazorpayController.orderRazorpayPayment);

orderRazorpayRouter
  .route("/orderRazorpaySuccess")
  .post(orderRazorpayController.orderRazorpaySuccess);
orderRazorpayRouter
  .route("/PendingPaymentRazorpay")
  .post(orderRazorpayController.PendingPaymentRazorpay);
orderRazorpayRouter
  .route("/PendingPaymentRazorpaySuccess")
  .post(orderRazorpayController.PendingPaymentRazorpaySuccess);

module.exports = orderRazorpayRouter;
