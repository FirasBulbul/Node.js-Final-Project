const express = require('express');
const router = express.Router();
const UserController = require("../controllers/users.controller.js");
const auth = require('../middlewares/auth.js');


router
    .post("/register", UserController.register)
    .post("/login", UserController.login);

module.exports = router;