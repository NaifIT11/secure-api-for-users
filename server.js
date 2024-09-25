const express = require("express");
const path = require("path");
const cors = require('cors')
const bodyParser = require('body-parser')
app =  express();






app.listen(5000 , () => {
    console.log("server is running on port 5000")
})