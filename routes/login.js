import jwt from "jsonwebtoken";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const loginRouter = express.Router();

loginRouter.get("/", (req, res) => {
    res.status(405).json({
        error: {
            status: 405,
            message: "Method not Allowed, expected POST request"
        }
    });
});

loginRouter.post("/", (req, res) => {
    console.log(`POST /login`);
    const { username, password } = req.body;

    console.log(req.body);

    if (username !== 'ahmed') {
        return res.status(404).json({
            error: {
                status: 404,
                message: "Invalid data"
            }
        });
    }
    if (password !== '123123') {
        return res.status(404).json({
            error: {
                status: 404,
                message: "Invalid data"
            }
        });
    }

    const accessToken = jwt.sign(
        {
            username: username,
            password: password
        },
        process.env.SECRET_KEY,
        { expiresIn: '2m' }
    );

    res.status(200).json({ accessToken });
});

export default loginRouter;
