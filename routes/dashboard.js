const jwt = require("jsonwebtoken");
const express = require("express");
const dashboardRouter = express.Router();
require('dotenv').config();

let userData = null;

dashboardRouter.use((req, res, next) => {
    const authorization = req.headers['Authorization'] || req.headers['authorization']; // Check for both cases
    if (!authorization) {
        return res.status(401).json({
            error: {
                status: 401,
                message: "Authorization header must be defined"
            }
        });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            error: {
                status: 401,
                message: "Token must be provided"
            }
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        userData = {
            username: decodedToken.username,
            password: decodedToken.password
        }
        next();
    } catch (error) {
        res.status(401).json({
            error: {
                status: 401,
                message: "Invalid token or token expires"
            }
        });
    }
});

dashboardRouter.get("/", (req, res) => {
    console.log(`GET /dashboard ${res.statusCode}`)
    res.json({
        data: userData
    });
});

module.exports = dashboardRouter;
