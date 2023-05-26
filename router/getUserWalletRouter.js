const getUserWalletRouter = require("express").Router();
const getUserWalletController = require("../controllers/get-user-wallet-controller");

getUserWalletRouter.route("/getUserWallet")
    .get(getUserWalletController.getUserWallet);

module.exports = getUserWalletRouter;