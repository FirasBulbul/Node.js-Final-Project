require("dotenv").config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require("dotenv").config();
const conn = require("./configs/db.js");
conn.connection();

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.get("/", (res, req) => { 
    res.send("API it's working"); 
});


const UsersRoute = require('./routers/user.router.js');
app.use('/users', UsersRoute); 

const PORT = process.env.PORT || 9000;
mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('Connected to DB');
        console.log("Server is running on port 9000");
    });
})


