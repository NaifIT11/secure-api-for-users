const jwt = require("jsonwebtoken");
const express = require("express");
const dashboardRouter = express.Router();


dashboardRouter.use((req , res , next) => {
    const authoriztion = req.headers['Authorization'];
    if(!authoriztion){
        res.status(401).json({message: "authorization header must be defined"})
    }
})




module.exports  = dashboardRouter;