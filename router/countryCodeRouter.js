const CountryCodeRouter = require('express').Router()
const CountryCodeController = require("../controllers/countryCode-controller")


CountryCodeRouter
    .route('/getCountryCode')
    .get(CountryCodeController.getCountryCode)



module.exports=CountryCodeRouter