"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const models_1 = require("../models");
const utils_1 = require("../utils");
class UserController {
    async readPagination(req, res) {
        const limit = req.query.limit || 10;
        const offset = req.query.offset;
        const records = await services_1.findUsers({ where: {}, limit, offset });
        return res.status(http_status_codes_1.StatusCodes.OK).json(records);
    }
    async signup(req, res, next) {
        const { username, email, password } = req.body;
        const existedUser = await models_1.UserInstance.findOne({
            where: {
                email,
            },
        });
        if (existedUser) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Please enter a valid username'));
        }
        const createdUser = await services_1.userSignup({ username, email, password });
        const token = utils_1.generateJWTToken({
            id: createdUser.getDataValue('id'),
            username: createdUser.getDataValue('username'),
            email: createdUser.getDataValue('email'),
            password: createdUser.getDataValue('password'),
        });
        return res.status(http_status_codes_1.StatusCodes.CREATED).json({
            user: createdUser,
            token,
        });
    }
    async login(req, res, next) {
        const { email, password } = req.body;
        const existedUser = await models_1.UserInstance.findOne({
            where: {
                email,
            },
        });
        if (!existedUser || !utils_1.compare(password, existedUser.getDataValue('password'))) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Please enter a valid email or password'));
        }
        const user = existedUser;
        const token = utils_1.generateJWTToken({
            id: user.getDataValue('id'),
            username: user.getDataValue('username'),
            email: user.getDataValue('email'),
            password: user.getDataValue('password'),
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            user,
            token,
        });
    }
}
exports.default = new UserController();
