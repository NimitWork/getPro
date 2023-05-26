const viewOrderRouter = require("express").Router();
const viewOrderController = require("../controllers/view-order-controller");

viewOrderRouter
    .route("/viewOrder")
    .get(viewOrderController.viewOrder);

module.exports = viewOrderRouter;