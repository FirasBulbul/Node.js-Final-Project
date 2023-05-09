const express = require('express');
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();

// app.use(cors());
// app.use(function (req, res, next) { // req = request, res = response, next = next function
//     res.header("Access-Control-Allow-Origin", "*"); //^ = allow all
//     res.header("Access-Control-Allow-METHODS", "GET, POST, PATCH, PUT, DELETE, HEAD, OPTIONS"); // allow these methods
//     res.header("Access-Control-Allow-Headers", "auth-token, Origin, X-Requested-With, Content-Type, Accept"); // allow these headers
//     next();
// });

//* DB STUFF
require("dotenv").config();
//! Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. Storing configuration in the environment separate from code is based on The Twelve-Factor App methodology.
require("./config/database").connect();

app.use(express.json());
/*
    * Returns middleware that only parses urlencoded bodies and only looks at requests
    * where the Content-Type header matches the type option
*/
app.use(bodyParser.urlencoded({ extended: true }));
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
app.get("/", (res, req) => { // GET method
    res.send("Hoooray! It works! This is Home page"); // a great info right! :D
});


const UsersRoute = require('./v1/api/routes/users.routes'); // import the users route
app.use('/api/v1/users', UsersRoute); // use the users route
const TodosRoute = require('./v1/api/routes/todo.routes'); // import the todos route
app.use('/api/v1/todos', TodosRoute); // use the todos route
const PORT = process.env.API_PORT || 3000;
// The OR operator || uses the right value if left is falsy, while the nullish coalescing operator ?? uses the right value if left is null or undefined.
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});


