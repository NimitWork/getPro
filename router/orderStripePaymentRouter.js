const orderStripeRouter = require("express").Router();
const orderStripeController = require("../controllers/order-stripe-payment-controller");

orderStripeRouter.route("/orderStripe").post(orderStripeController.orderStripe);

orderStripeRouter
  .route("/orderStripeSuccess")
  .post(orderStripeController.orderStripeSuccess);
orderStripeRouter
  .route("/PendingPaymentStripe")
  .post(orderStripeController.PendingPaymentStripe);
orderStripeRouter
  .route("/PendingPaymentStripeSuccess")
  .post(orderStripeController.PendingPaymentStripeSuccess);

module.exports = orderStripeRouter;
