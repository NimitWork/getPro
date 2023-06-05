const getInTouchROuter = require("express").Router();
const getInTouchROuterController = require("../controllers/get-in-touch-controller");

getInTouchROuter.route("/getInTouch")
    .post(getInTouchROuterController.getInTouch);

module.exports = getInTouchROuter;