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

    jwt.verify(token , process.env.SECRET_KEY , (err , user)  => {
        if(err){
            res.status(403).json({
                error:{
                    status: 403,
                    message: "invalid token"
                }
            })
        }
        
    });

    next();

})



dashboardRouter.get("/" , (req , res) => {
    res.json({
        fakeData: "fwklwnkvnlfjlwj"
    })
})



module.exports  = dashboardRouter;