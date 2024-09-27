import express from "express";
import path from "path";
import cors from "cors";
import bodyParser from "body-parser";
import dashboardRouter from "./routes/dashboard.js";
import loginRouter from "./routes/login.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Parse JSON for all routes
app.use(bodyParser.json());

// Routes
app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);

// 404 route
app.use((req, res) => {
    res.status(404).json({
        message: "Get token from /login and access your info in /dashboard"
    });
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
