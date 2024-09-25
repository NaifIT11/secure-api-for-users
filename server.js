const express = require("express");
const path = require("path");
const cors = require('cors')
const bodyParser = require('body-parser')
app =  express();



app.use((req , res) => {
    res.json({
        message: "get token from /login and acccess your info in /dashboard"
    })
});




app.listen(5000 , () => {
    console.log("server is running on port 5000")
})