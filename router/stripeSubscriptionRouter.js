const StripeSubscriptionRouter = require("express").Router();
const stripeSubscriptionController = require("../controllers/stripe-subscription-controller");

StripeSubscriptionRouter
  .route("/stripeSubscription/:id")
  .post(stripeSubscriptionController.stripeSubscription);
  StripeSubscriptionRouter
  .route("/StripeSubscriptionSuccess")
  .post(stripeSubscriptionController.verifyStripeSubscriptionPayment);

module.exports = StripeSubscriptionRouter;
