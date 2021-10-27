"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateJWTToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
const generateJWTToken = (userDetails) => {
    const token = jsonwebtoken_1.default.sign({
        expiresIn: config_1.default.get('jwt_expired_date'),
        data: userDetails,
    }, config_1.default.get('jwt_secret'));
    return token;
};
exports.generateJWTToken = generateJWTToken;
