const jwt = require("jsonwebtoken");
const express = require("express");
const dashboardRouter = express.Router();
require('dotenv').config()

dashboardRouter.use((req , res , next) => {
    const authoriztion = req.headers['Authorization'];
    if(!authoriztion){
        res.status(401).json({
            error: {
                status: 405,
                message: "authorization header must be defined"
            }
        }
        )
    }

    const token = authoriztion.split(" ")[1];

    try {
        const decodedToken = jwt.verify(token , process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(401).json({
            error:{
                status: 401,
                message: "invalid token"
            }
        })
    }

})



dashboardRouter.get("/" , (req , res) => {
    res.json({
        fakeData: "fwklwnkvnlfjlwj"
    })
})



module.exports  = dashboardRouter;