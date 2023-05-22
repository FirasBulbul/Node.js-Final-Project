const { request } = require("express");
const bcrypt = require("bcryptjs");

require("dotenv").config();
const jwt = require("jsonwebtoken");

const usersModel = require("../models/users.model");

//signUp ---
const signUp = async (data) => {
    try {
        const { first_name, last_name, email, password } = data;
        const oldUser = await usersModel.findOne({ email });
        if (oldUser) {
            return { error: "User Is Exists. Please Login" };
        }
        // Encrypting Password
        const encryptedPassword = await bcrypt.hash(password, 15);

        const user = await usersModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            // created_at: new Date(),
        });
        // construct token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN,
        );
        // save token
        user.token = token;
        // new user
        return user;
    } catch (error) {
        console.log("Couldn't Create a New User", error);
    }
    console.log('test01');
};

//register ---
const register = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.first_name || !body.last_name || !body.email || !body.password) {
            return response
                .status(400)
                .json({ message: "Please, All of reuiremnts is compulsory" });
        }
        const createdUser = await signUp(body);
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

//signIn ---
const signIn = async () => {
    try {
        const { email, password } = data;
        const user = await usersModel.findOne({ email });
        if (!user) {
            return { error: "Join us :)" };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return { error: "Error Username or Password: Please Check them :)" };
        }
        // costruct a token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN,
        );
        // save token
        user.token = token;
        // logging user
        return user;
    } catch (error) {
        console.log("Sign In Error", error);
    }
};

//login ---
const login = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.email || !body.password) {
            return response.status(400).json({ message: "Both Email & Password are required" });
        }
        const user = await signIn(body);
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
