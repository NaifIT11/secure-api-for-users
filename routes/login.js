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



module.exports = loginRouter