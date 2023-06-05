const RazorpayPaymentRouter = require("express").Router();
const RazorpayPaymentController = require("../controllers/razorpay-payment-controller");

RazorpayPaymentRouter.route("/razorpayPayment").post(
  RazorpayPaymentController.razorpayPayment
);
RazorpayPaymentRouter.route("/razorpay-is-completed").post(
  RazorpayPaymentController.razorpay_is_completed
);

module.exports = RazorpayPaymentRouter;
