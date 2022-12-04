const User = require('../model/user')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {

    let username = req.body.username;
    let email = req.body.email;
    let Originalpassword = req.body.password
    try {
        if(username !=='' && email !=='' && Originalpassword !=='' && username !==undefined && email !==undefined && Originalpassword !== undefined && req.body.confirmPassword !=='' && req.body.confirmPassword !==undefined){
            let password= await bcrypt.hash(Originalpassword, 10)
            let existUsername = await User.findOne({ username: req.body.username })
            let existEmail = await User.findOne({ email: req.body.email })
            if (existUsername === null) {
                if (existEmail === null) {
                    if(req.body.password === req.body.confirmPassword){
                        const userData = new User({ username: username, email: email, password: password, status: "active" })
                        await userData.save()
                        res.status(201).json({
                            message: "successfully register"
                        })
                    }
                    else{
                        res.status(404).json({
                            message: 'please enter same password'
                        })
                    }
                } else {
                    res.status(404).json({
                        message: 'your email id is already exist'
                    })
                }
    
            } else {
                res.status(404).json({
                    message: 'your username is already exist'
                })
            }
        }else{
            res.status(404).json({
                message: 'you can not insert blank data'
            })
        }
           
    } catch (error) {
        res.json({
            error: error.message
        })
    }
}