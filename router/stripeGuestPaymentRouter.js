const paymentStripeRouter = require("express").Router();
const stripeGuestPaymentController = require("../controllers/stripeGuestPayment-controller");

paymentStripeRouter
  .route("/stripeGuestPayment")
  .post(stripeGuestPaymentController.payment);
paymentStripeRouter
  .route("/stripeGuestPaymentSuccess")
  .post(stripeGuestPaymentController.stripeGuestPaymentSuccess);

module.exports = paymentStripeRouter;
