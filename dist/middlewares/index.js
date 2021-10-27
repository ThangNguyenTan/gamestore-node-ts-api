"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const config_1 = __importDefault(require("config"));
const debug_logger_1 = __importDefault(require("../logger/debug-logger"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
class Middleware {
    constructor() {
        this.defaultErrorHandler = (err, req, res, next) => {
            const statusCode = err.status || 500;
            debug_logger_1.default({
                statusCode,
                ...err,
            });
            if (config_1.default.get('node_env') === 'production') {
                if (statusCode === 500) {
                    return res.status(statusCode).send({ message: 'Internal Server Error' });
                }
            }
            return res.status(statusCode).send({ statusCode, ...err });
        };
    }
    handleValidationError(req, res, next) {
        const error = express_validator_1.validationResult(req);
        if (!error.isEmpty()) {
            return res.json(error.array()[0]);
        }
        next();
    }
    validateRequest(req, next, schema) {
        const options = {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true, // remove unknown props
        };
        const { error, value } = schema.validate(req.body, options);
        if (error) {
            return next(http_errors_1.default(http_status_codes_1.StatusCodes.UNPROCESSABLE_ENTITY, `Validation error: ${error.details.map((x) => x.message).join(', ')}`));
        }
        req.body = value;
        return next();
    }
}
const Middlewares = new Middleware();
__exportStar(require("./jwt.middleware"), exports);
exports.default = Middlewares;
