"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = exports.findUsers = void 0;
const models_1 = require("../models");
const utils_1 = require("../utils");
const findUsers = async (options) => {
    const genres = await models_1.UserInstance.findAll(options);
    return genres;
};
exports.findUsers = findUsers;
const userSignup = async (newUser) => {
    const { email, username } = newUser;
    let { password } = newUser;
    password = utils_1.encrypt(password);
    const createdUser = await models_1.UserInstance.create({
        username,
        email,
        password,
    });
    return createdUser;
};
exports.userSignup = userSignup;
