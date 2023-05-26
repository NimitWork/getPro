const UseSavePaymentMethodRouter = require("express").Router();
const UseSavePaymentMethodController = require("../controllers/useSavePaymentMethod-controller");

UseSavePaymentMethodRouter.route("/useSavePaymentMethod").post(
  UseSavePaymentMethodController.UseSavePaymentMethod
);
UseSavePaymentMethodRouter.route("/useSaveRazorpayPayment").post(
  UseSavePaymentMethodController.usesaveRazorpayPayment
);

module.exports = UseSavePaymentMethodRouter;
