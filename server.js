const express = require("express");
const path = require("path");
const cors = require('cors')
const bodyParser = require('body-parser');
const dashboardRouter = require("./routes/dashboard");
const loginRouter = require("./routes/login");
require('dotenv').config()
app =  express();


//parse json for all routes

app.use(bodyParser.json());


//routes
app.use("/dashboard" , dashboardRouter);
app.use("/login" ,loginRouter);

//404 route
app.use((req , res) => {
    res.status(404).json({
        message: "get token from /login and acccess your info in /dashboard"
    })
});

const PORT = process.env.PORT;



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})