const PaypalSubscriptioinRouter = require("express").Router();
const PaypalSubscriptionController = require("../controllers/paypal-subscription-controller");

PaypalSubscriptioinRouter.route("/PaypalSubscription/:id").post(
  PaypalSubscriptionController.PaypalSubscription
);
PaypalSubscriptioinRouter.route("/payplesubscriptionsuccess").post(
  PaypalSubscriptionController.paypalSubscriptionSuccess
);

module.exports = PaypalSubscriptioinRouter;
