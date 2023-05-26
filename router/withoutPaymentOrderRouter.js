const withoutPaymentOrderRouter = require('express').Router()
const withoutPaymentOrderController = require("../controllers/without-payment-order-controller")


withoutPaymentOrderRouter
    .route('/withoutPaymentOrder')
    .post(withoutPaymentOrderController.withoutPaymentOrder);

module.exports=withoutPaymentOrderRouter