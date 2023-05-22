const { request } = require("express");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const usersModel = require("../models/users.model");

//register ---
const register = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.first_name || !body.last_name || !body.email || !body.password) {
            return response
                .status(400)
                .json({ message: "Please, All of reuiremnts is compulsory" });
        }
        const createdUser = await usersModel.signUp(body);
        if (!createdUser) {
            return response.status(404).json({ message: "No User is Created" });
        }
        if (createdUser.error) {
            return response.status(400).json({ message: createdUser.error });
        }
        return response.status(200).json(createdUser);
    } catch (error) {
        return response.status(500).json({ error: error });
    }
};

//login ---
const login = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.email || !body.password) {
            return response.status(400).json({ message: "Both Email & Password are required" });
        }
        const user = await usersModel.signIn(body);
        // console.log('test 01');
        if (!user) {
            // console.log('test 02');
            return response.status(404).json({ message: "Sorry Cannot Logging :(" });
        }
        if (user.error) {
            return response.status(400).json({ message: user.error });
        }
        return response.status(200).json(user);
    } catch (error) {
        return response.status(500).json({ error: error });
    }
}

module.exports = { register, login };
