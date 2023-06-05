const orderPaypalRouter = require("express").Router();
const orderPaypalController = require("../controllers/order-paypal-controller");

orderPaypalRouter.route("/orderPaypal").post(orderPaypalController.orderPaypal);
orderPaypalRouter
  .route("/PaypalOrderSuccess")
  .post(orderPaypalController.PaypalOrderSuccess);
orderPaypalRouter
  .route("/PendingPaymentPaypal")
  .post(orderPaypalController.PendingPaymentPaypal);
orderPaypalRouter
  .route("/PendingPaymentPaypalSuccess")
  .post(orderPaypalController.PendingPaymentPaypalSuccess);

module.exports = orderPaypalRouter;
