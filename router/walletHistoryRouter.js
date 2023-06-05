const walletTransactionHistoryRouter = require('express').Router()
const walletTransactionHistoryController = require("../controllers/wallet-transaction-history-controller")


walletTransactionHistoryRouter
    .route('/walletTransactionHistory')
    .get(walletTransactionHistoryController.getWalletTransactionHistory)


module.exports=walletTransactionHistoryRouter