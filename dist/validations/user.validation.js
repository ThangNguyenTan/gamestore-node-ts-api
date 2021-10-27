"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUserLogin = exports.validateUserSignup = void 0;
const joi_1 = __importDefault(require("joi"));
const middlewares_1 = __importDefault(require("../middlewares"));
const validateUserSignup = (req, res, next) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().required().max(255),
        email: joi_1.default.string().required().max(255),
        password: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUserSignup = validateUserSignup;
const validateUserLogin = (req, res, next) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().required().max(255),
        password: joi_1.default.string().required().max(255),
    });
    middlewares_1.default.validateRequest(req, next, schema);
};
exports.validateUserLogin = validateUserLogin;
