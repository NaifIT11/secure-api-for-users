const jwt = require("jsonwebtoken");
const express = require("express");
const dashboardRouter = express.Router();
require('dotenv').config()

const loginRouter = express.Router()


loginRouter.get("/" , (req , res) => {
    res.status(405).json({
        error: {
            status: 405,
            message: "Method not Allowed expected POST request"
        }
    })
});


loginRouter.post("/" , (req , res) => {
    console.log(`POST /login`)
    const {username , password} = req.body;

    console.log(req.body)

    if(username !== 'ahmed'){
        res.status(404).json({
            error:{
                status: 404,
                message: "invaild data"
            }
        })
    }
    if(password !== '123123'){
        res.status(404).json({
            error:{
                status: 404,
                message: "invaild data"
            }
        })
    }

    const accessToken = jwt.sign({
        username: username,
        password: password
    }, process.env.SECRET_KEY , {expiresIn: '30s'});

    res.status(200).json({accessToken: accessToken})

});


module.exports = loginRouter