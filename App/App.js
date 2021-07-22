const express = require('express');
var bodyParser = require("body-parser");
const UserRoute = require('./Routes/UserRoute');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/',UserRoute);

const PORT = 4001;

app.listen(PORT, function () {
    console.log("Server is running on PORT : "+PORT);
})