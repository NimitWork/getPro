const razorPayGuestPaymentRouter = require("express").Router();
const razorPayGuestPaymentController = require("../controllers/razorPayGuestPayment-controller");

razorPayGuestPaymentRouter
  .route("/razorpayGuestPaymentSuccess")
  .post(razorPayGuestPaymentController.razorpayGuestPaymentSuccess);
module.exports = razorPayGuestPaymentRouter;
