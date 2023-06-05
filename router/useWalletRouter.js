const useWalletRouter = require("express").Router();
const useWalletController = require("../controllers/use-wallet-controller");

useWalletRouter.route("/useWallet")
    .post(useWalletController.useWallet);

module.exports = useWalletRouter;