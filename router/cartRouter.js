const cartRouter = require('express').Router()
const cartController = require("../controllers/cart-controller")


cartRouter
    .route('/addCart/:id')
    .post(cartController.addCart)
cartRouter
    .route('/viewCart')
    .get(cartController.viewCart)
cartRouter
    .route('/deleteCart/:id')
    .post(cartController.deleteCart)


module.exports=cartRouter