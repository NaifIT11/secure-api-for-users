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
    const {email , password} = req.body;

    if(email !== 'ahmed@gmail.com'){
        res.status(404).json({
            error:{
                status: 404,
                message: "invaild data"
            }
        })
    }
    if(password !== 'ahmed#wer123#mM'){
        res.status(404).json({
            error:{
                status: 404,
                message: "invaild data"
            }
        })
    }

    

});


module.exports = loginRouter