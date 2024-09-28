import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";

dotenv.config();

const dashboardRouter = express.Router();
let userData = null;

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-7",
    message: {
        error: {
            status: 429,
            message: "Too many requests you have only 20 request per 15 minute"
        }
    }
});

dashboardRouter.use(limiter);

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
        };
        next();
    } catch (error) {
        console.log("GET /dashboard 401");
        res.status(401).json({
            error: {
                status: 401,
                message: "Invalid token or token expired"
            }
        });
    }
});

dashboardRouter.get("/", (req, res) => {
    console.log(`GET /dashboard ${res.statusCode}`);
    res.json({
        data: userData
    });
});

export default dashboardRouter;
