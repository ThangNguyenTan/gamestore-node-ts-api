"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = __importDefault(require("config"));
const http_status_codes_1 = require("http-status-codes");
const http_errors_1 = __importDefault(require("http-errors"));
const validateToken = async (req, res, next) => {
    let accessToken = req.header('Authorization');
    if (!accessToken)
        return next(http_errors_1.default(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You haven't logged in yet"));
    let user;
    // eslint-disable-next-line prefer-destructuring
    accessToken = accessToken.split(' ')[1];
    try {
        const validToken = jsonwebtoken_1.verify(accessToken, config_1.default.get('jwt_secret'));
        if (typeof validToken === 'string') {
            throw new Error('');
        }
        user = validToken.data;
        req.user = user;
        if (!user) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This user does not exist'));
        }
        return next();
    }
    catch (err) {
        return next(http_errors_1.default(http_status_codes_1.StatusCodes.FORBIDDEN, 'Invalid token or limited authority'));
    }
};
exports.validateToken = validateToken;
