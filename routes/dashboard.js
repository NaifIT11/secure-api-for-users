const jwt = require("jsonwebtoken");
const express = require("express");
const dashboardRouter = express.Router();
require('dotenv').config();

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
        next();
    } catch (error) {
        res.status(401).json({
            error: {
                status: 401,
                message: "Invalid token"
            }
        });
    }
});

dashboardRouter.get("/", (req, res) => {
    res.json({
        fakeData: "fwklwnkvnlfjlwj"
    });
});

module.exports = dashboardRouter;
