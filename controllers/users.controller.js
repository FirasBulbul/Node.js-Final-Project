const { request } = require('express');
const bcrypt = require('bcryptjs');
require("dotenv").config();
const jwt = require('jsonwebtoken');
const usersModel = require('../models/users.model');

const signUp = async (data) => {
    try {
        const { first_name, last_name, email, password } = data;
        const oldUser = await usersModel.findOne({ email });
        if (oldUser) {
            return { error: "Please Login" };
        }

        const encryption = await bcrypt.hash(password, 10); 

        const user = await usersModel.create({
            first_name: first_name,
            last_name: last_name,
            email: email.toLowerCase(),
            password: encryption,
            created_at: new Date(),
        });

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_TOKEN_KEY,
        );

        user.token = token;

        return user;
    } catch (error) {
        console.log("Couldn't Create a New User", error);
    }
}

const register = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.first_name || !body.last_name || !body.email || !body.password) {
            return response.status(400).json({ message: "Please, All of reuiremnts is compulsory" });
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
}

const signIn = async () => {
    try {
        const { email, password } = data;
        const user = await usersModel.findOne({ email });
        if (!user) {
            return { error: "Join us :)" };
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return { error: "Invalid Credentials" };
        }

        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.JWT_TOKEN_KEY,
        );

        user.token = token;

        return user;
    } catch (error) {
        console.log("Sign In Error", error);
    }
}

const login = async (request, response, next) => {
    try {
        const body = request.body;
        if (!body.email || !body.password) {
            return response.status(400).json({ message: "Please fill (email, password)." });
        }
        const user = await signIn(body);
        console.log('test 01');
        if (!user) {
            console.log('test 01');
            return response.status(404).json({ message: "Couldn't Login" });
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