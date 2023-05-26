const paymentRouter = require("express").Router();
const paymentController = require("../controllers/stripe-payment-controller");


paymentRouter
  .route("/CancelStripeSubcription")
  .post(paymentController.CancelStripeSubcription);
paymentRouter.route("/payment").post(paymentController.payment);
paymentRouter.route("/rechargeWallet").post(paymentController.rechargeWallet);

module.exports = paymentRouter;
