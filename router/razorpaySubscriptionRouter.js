const RazorpaySubscriptiontRouter = require("express").Router();
const RazorpaySubscriptionController = require("../controllers/razorpay-subscription-controller");


RazorpaySubscriptiontRouter.route("/razorpayCreateSubscription/:id").post(
    RazorpaySubscriptionController.razorpayCreateSubscription
);
RazorpaySubscriptiontRouter.route("/verifySubscriptionPayment").post(
    RazorpaySubscriptionController.verifySubscriptionPayment
);
module.exports = RazorpaySubscriptiontRouter;
